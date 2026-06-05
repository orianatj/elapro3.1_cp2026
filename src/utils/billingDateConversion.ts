export function billingDateTranform(billingDate: string) {

    const currentPeriodEnd = new Date(billingDate
    ).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });

    return currentPeriodEnd

};


