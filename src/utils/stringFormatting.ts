// Helper function to conver string data to UI friendly version

export function formatString(stringData: string) {

    const planName = stringData.replaceAll("_", " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

    return planName
};