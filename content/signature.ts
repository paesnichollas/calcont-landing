export type SignatureCtaTarget = "whatsapp" | "portal_login";

export type SignatureContent = {
  text: string;
  ctaLabel: string;
  ctaTarget: SignatureCtaTarget;
};

export const signatureContent: SignatureContent = {
  text: "Mais clareza para decidir, mais controle para crescer.",
  ctaLabel: "Falar no WhatsApp",
  ctaTarget: "whatsapp"
};
