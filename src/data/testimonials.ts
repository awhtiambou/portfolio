// Testimonials data with multilingual support

export interface Testimonial {
    id: string;
    name: string;
    title: string;
    relationship: {
        en: string;
        fr: string;
    };
    date: string;
    content: {
        en: string;
        fr: string;
    };
    avatar?: string;
    linkedinUrl?: string;
}

export const testimonials: Testimonial[] = [
    {
        id: "hela-haj-mohamed",
        name: "Hela HAJ MOHAMED",
        title: "Assistant Professor in Computer Science at FSM, U.Monastir",
        relationship: {
            en: "was my teacher",
            fr: "était ma professeure"
        },
        date: "2025-07-23",
        content: {
            en: "Abdoul-Wahabou H. Tiambou stands out as one of the most exceptional students I've had taught at the Faculty of Sciences in Monastir. His outstanding expertise in computer science, artificial intelligence, and computer vision is matched by his sharp analytical mind, remarkable autonomy, and creative problem-solving approach. Beyond his technical brilliance, his personal strengths, including reliability, perseverance, and collaborative spirit, make him an extraordinary professional. I enthusiastically recommend Abdoul-Wahabou for roles in AI, machine learning, or computer vision. Any organization would benefit from his unique combination of talent, dedication, and innovative thinking. I have no doubt he will make significant contributions and achieve great success in his career.",
            fr: "Abdoul-Wahabou H. Tiambou se distingue comme l'un des étudiants les plus exceptionnels que j'ai eu l'occasion d'enseigner à la Faculté des Sciences de Monastir. Son expertise remarquable en informatique, intelligence artificielle et vision par ordinateur est accompagnée d'un esprit analytique aiguisé, d'une autonomie remarquable et d'une approche créative de résolution de problèmes. Au-delà de sa brillance technique, ses qualités personnelles, notamment sa fiabilité, sa persévérance et son esprit collaboratif, font de lui un professionnel extraordinaire. Je recommande chaleureusement Abdoul-Wahabou pour des postes en IA, machine learning ou vision par ordinateur. Toute organisation bénéficierait de sa combinaison unique de talent, de dévouement et de pensée innovante. Je n'ai aucun doute qu'il fera des contributions significatives et atteindra un grand succès dans sa carrière."
        },
        linkedinUrl: "https://www.linkedin.com/in/hela-haj-mohamed"
    },
    {
        id: "ahmadou-kassoum",
        name: "Ahmadou B. Kassoum",
        title: "Software Engineer",
        relationship: {
            en: "we studied together",
            fr: "nous avons étudié ensemble"
        },
        date: "2022-09-07",
        content: {
            en: "It's hard to describe how Abdoul Wahabou's work impressed me when I had the chance to work with him. Abdoul Wahabou is a true asset to any team and will adapt perfectly to different projects.",
            fr: "Il est difficile de décrire comment le travail de Abdoul Wahabou m'a impressionné quand j'ai eu la chance de travailler avec lui. Abdoul Wahabou est un vrai atout dans une équipe et s'adaptera parfaitement à différents projets."
        },
        linkedinUrl: "https://www.linkedin.com/in/ahmadou-bachir-ab103019b"
    }
];

// Helper to get testimonial content for current locale
export function getTestimonialContent(testimonial: Testimonial, locale: 'en' | 'fr'): string {
    return testimonial.content[locale];
}

// Helper to format relationship text
export function getRelationshipText(testimonial: Testimonial, locale: 'en' | 'fr'): string {
    const date = new Date(testimonial.date);
    const formattedDate = date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'long',
        year: 'numeric'
    });
    return `${formattedDate}, ${testimonial.relationship[locale]}.`;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): { text: string; isTruncated: boolean } {
    if (text.length <= maxLength) {
        return { text, isTruncated: false };
    }
    return {
        text: text.substring(0, maxLength).trim() + '...',
        isTruncated: true
    };
}
