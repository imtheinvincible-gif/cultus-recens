import Header from '@/components/Header/Header';
import AiShopper from '@/components/AiShopper/AiShopper';

// This layout wraps ONLY the (storefront) route group.
// Admin pages get their own layout and won't inherit Header or AiShopper.
export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <AiShopper />
    </>
  );
}
