// Fake News vs Facts data for scrolling animation
const fakeVsFactsData = [
    {
        id: 1,
        category: "Technology",
        emoji: "📱",
        fakeNews: {
            title: "5G Towers Control Your Mind",
            content: "New study reveals 5G towers emit brain-controlling frequencies that make people buy more products online."
        },
        realFact: {
            title: "5G Technology Facts",
            content: "5G uses radio frequencies similar to 4G but with higher speeds. No scientific evidence supports mind control claims."
        }
    },
    {
        id: 2,
        category: "Health",
        emoji: "💉",
        fakeNews: {
            title: "Vaccines Contain Microchips",
            content: "Secret government documents reveal all vaccines now contain tracking microchips to monitor citizens."
        },
        realFact: {
            title: "Vaccine Ingredients",
            content: "Vaccines contain antigens, preservatives, and stabilizers. No microchips or tracking devices are present."
        }
    },
    {
        id: 3,
        category: "Climate",
        emoji: "🌡️",
        fakeNews: {
            title: "Global Warming is a Hoax",
            content: "Scientists admit climate change data was fabricated to increase government funding and control."
        },
        realFact: {
            title: "Climate Science Consensus",
            content: "97% of climate scientists agree that human activities are the primary cause of recent climate change."
        }
    },
    {
        id: 4,
        category: "Space",
        emoji: "🌙",
        fakeNews: {
            title: "Moon Landing Was Staged",
            content: "Hollywood director admits he filmed the 1969 moon landing in a secret studio for NASA."
        },
        realFact: {
            title: "Moon Landing Evidence",
            content: "Multiple lines of evidence confirm moon landings, including retroreflectors still used by scientists today."
        }
    },
    {
        id: 5,
        category: "AI",
        emoji: "🤖",
        fakeNews: {
            title: "AI Will Replace All Jobs by 2025",
            content: "Leaked report shows artificial intelligence will eliminate 95% of human jobs within two years."
        },
        realFact: {
            title: "AI Job Impact Reality",
            content: "AI will transform jobs rather than eliminate them entirely. New roles in AI management and oversight are emerging."
        }
    },
    {
        id: 6,
        category: "Food",
        emoji: "🥛",
        fakeNews: {
            title: "Milk Causes Autism",
            content: "New research links dairy consumption during pregnancy to increased autism rates in children."
        },
        realFact: {
            title: "Autism Research Facts",
            content: "No credible scientific evidence links dairy consumption to autism. Autism has genetic and developmental factors."
        }
    },
    {
        id: 7,
        category: "Internet",
        emoji: "📡",
        fakeNews: {
            title: "WiFi Signals Cause Cancer",
            content: "Study reveals WiFi radiation increases cancer risk by 300% in households with multiple devices."
        },
        realFact: {
            title: "WiFi Safety Research",
            content: "WiFi uses non-ionizing radiation at levels far below harmful thresholds. No cancer link has been established."
        }
    },
    {
        id: 8,
        category: "Medicine",
        emoji: "💊",
        fakeNews: {
            title: "Natural Remedies Cure Everything",
            content: "Big Pharma suppresses knowledge that lemon juice and honey can cure cancer and diabetes."
        },
        realFact: {
            title: "Evidence-Based Medicine",
            content: "While natural compounds can have health benefits, serious diseases require proven medical treatments."
        }
    },
    {
        id: 9,
        category: "Energy",
        emoji: "⚡",
        fakeNews: {
            title: "Free Energy Devices Suppressed",
            content: "Oil companies hide revolutionary free energy technology that could power the world forever."
        },
        realFact: {
            title: "Energy Conservation Laws",
            content: "The laws of thermodynamics prevent perpetual motion machines. Energy cannot be created from nothing."
        }
    },
    {
        id: 10,
        category: "Nutrition",
        emoji: "🍎",
        fakeNews: {
            title: "Organic Food is a Scam",
            content: "Secret study shows organic foods contain more pesticides than conventional produce."
        },
        realFact: {
            title: "Organic Standards",
            content: "Organic foods are grown with strict regulations limiting synthetic pesticides and fertilizers."
        }
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = fakeVsFactsData;
}
