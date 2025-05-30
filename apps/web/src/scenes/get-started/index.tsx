'use client';
import { useSearchParams } from 'next/navigation';
import type { JSX } from 'react';
import { useEffect, useState, Suspense } from 'react';
import AddWallet from './components/add-wallet';
import ImportWallet from './components/import-wallet';
import MasterPassword from './components/master-password';
import RecoveryPhrase from './components/recovery-phrase';
import Welcome from './components/welcome';
import { useI18n } from '@/utils/i18n';

const GetStartedContent = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<string | null>(null);
  useEffect(() => {
    setStep(searchParams?.get('step') ?? null);
  }, [searchParams]);

  const components = {
    addWallet: AddWallet,
    masterPassword: MasterPassword,
    importWallet: ImportWallet,
    recoveryPhrase: RecoveryPhrase,
  };

  const stepsMap: Record<string, JSX.Element> = {
    welcome: <Welcome />,
    'add-wallet': <components.addWallet />,
    'master-password': <components.masterPassword />,
    'import-wallet': <components.importWallet />,
    'recovery-phrase': <components.recoveryPhrase />,
  };
  // items-center justify-center

  return (
    <div className="px-9 flex flex-col min-h-[100dvh] w-screen  py-[50px] items-center justify-center">
      {stepsMap[step || 'welcome']}
    </div>
  );
};

const GetStarted = () => {
  const { t } = useI18n();
  return (
    <Suspense fallback={<div>{t('loading')}</div>}>
      <GetStartedContent />
    </Suspense>
  );
};

export default GetStarted;
