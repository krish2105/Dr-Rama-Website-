import QRCode from "qrcode";

/** Server-rendered QR code (inline SVG, no image request). Needs a visible label nearby: the code is not readable by screen readers. */
export async function QrCode({ url, label, className = "" }: { url: string; label: string; className?: string }) {
  const svg = await QRCode.toString(url, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#13203F", light: "#FFFFFF" } });
  return <div role="img" aria-label={label} className={`qr bg-white p-2 ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
