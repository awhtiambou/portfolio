"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MagneticButton, TiltCard } from "@/components/ui";


export function AboutHeroSection() {
    const t = useTranslations();

    return (
        <div className="min-h-screen w-full flex justify-center items-center pt-28">
            <div className="w-[calc(100%-2rem)] lg:w-[90%] xl:w-[80%] grid grid-cols-6 gap-8 place-items-center">

                <h1 className="text-5xl font-bold text-center col-span-6 w-full">
                    {t("about.title")}
                </h1>

                <div className="w-full text-center col-span-6 md:col-span-3 lg:col-span-2">
                    <TiltCard glowOpacity={0} className="aspect-[5/5] md:aspect-[4/5] overflow-hidden rounded-b-4xl md:rounded-b-xl rounded-t-4xl md:rounded-t-full">
                        <Image
                            src="/assets/images/me-coding.jpg"
                            alt="Abdoul"
                            fill
                            className="object-cover rounded-b-4xl md:rounded-b-xl"
                            priority
                        />
                    </TiltCard>
                </div>
                <div className="w-full text-left col-span-6 md:col-span-3 lg:col-span-4 lg:pl-20">
                    <h2 className="text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">
                        {t("about.subtitle")}
                    </h2>
                    <div className="space-y-4 text-lg md:text-xl max-w-2xl">
                        <p>
                            {t("about.bio1")}
                        </p>
                        <p>
                            {t("about.bio2")}
                        </p>
                        <p>
                            {t("about.bio3")}
                        </p>
                    </div>
                    <MagneticButton href="/contact" backgroundColor="var(--color-yellow)" style={{ fontWeight: 600, backgroundColor: 'var(--color-yellow)' }}>
                        {t("common.downloadMyResume")}
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
}
