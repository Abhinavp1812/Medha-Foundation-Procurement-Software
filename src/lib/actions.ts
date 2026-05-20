"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth, signIn } from "@/auth";
import {
  signUpSchema,
  rfqSchema,
  quoteSchema,
} from "@/lib/validations";

type ActionResult = { error?: string; ok?: boolean };

// ---------- VENDOR SIGNUP (open registration) ----------
export async function registerVendor(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyName: formData.get("companyName"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, email, password, companyName, phone } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "VENDOR",
      companyName,
      phone,
    },
  });

  // Auto sign-in after registration.
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/vendor",
  });

  return { ok: true };
}

// ---------- ADMIN: CREATE RFQ ----------
export async function createRfq(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "Not authorized" };
  }

  const parsed = rfqSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category") || undefined,
    quantity: formData.get("quantity"),
    unit: formData.get("unit") || "units",
    budget: formData.get("budget") || undefined,
    deadline: formData.get("deadline"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.rfq.create({
    data: {
      ...parsed.data,
      createdById: session.user.id,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

// ---------- VENDOR: SUBMIT QUOTE ----------
export async function submitQuote(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.role !== "VENDOR") {
    return { error: "Not authorized" };
  }

  const parsed = quoteSchema.safeParse({
    rfqId: formData.get("rfqId"),
    unitPrice: formData.get("unitPrice"),
    deliveryDays: formData.get("deliveryDays"),
    notes: formData.get("notes") || undefined,
    attachmentUrl: formData.get("attachmentUrl") || "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const rfq = await prisma.rfq.findUnique({ where: { id: parsed.data.rfqId } });
  if (!rfq || rfq.status !== "OPEN") {
    return { error: "This RFQ is no longer accepting quotes" };
  }

  const totalPrice = parsed.data.unitPrice * rfq.quantity;

  await prisma.quote.upsert({
    where: {
      rfqId_vendorId: {
        rfqId: parsed.data.rfqId,
        vendorId: session.user.id,
      },
    },
    create: {
      rfqId: parsed.data.rfqId,
      vendorId: session.user.id,
      unitPrice: parsed.data.unitPrice,
      totalPrice,
      deliveryDays: parsed.data.deliveryDays,
      notes: parsed.data.notes,
      attachmentUrl: parsed.data.attachmentUrl || null,
    },
    update: {
      unitPrice: parsed.data.unitPrice,
      totalPrice,
      deliveryDays: parsed.data.deliveryDays,
      notes: parsed.data.notes,
      attachmentUrl: parsed.data.attachmentUrl || null,
      status: "SUBMITTED",
    },
  });

  revalidatePath(`/vendor/rfq/${parsed.data.rfqId}`);
  revalidatePath("/vendor");
  return { ok: true };
}

// ---------- ADMIN: AWARD A QUOTE ----------
export async function awardQuote(rfqId: string, quoteId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return;

  await prisma.$transaction([
    prisma.quote.update({
      where: { id: quoteId },
      data: { status: "AWARDED" },
    }),
    prisma.quote.updateMany({
      where: { rfqId, id: { not: quoteId } },
      data: { status: "REJECTED" },
    }),
    prisma.rfq.update({
      where: { id: rfqId },
      data: { status: "AWARDED", awardedQuoteId: quoteId },
    }),
  ]);

  revalidatePath(`/admin/rfq/${rfqId}`);
}
