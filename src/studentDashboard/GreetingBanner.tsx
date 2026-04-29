// Provide type to describe the GreetingBanner component's props
type StudentProps = {
    /** The name to display inside the banner */
    name: string;
}

// Greeting Banner component 
export function GreetingBanner({name}: StudentProps){

    return(
        <div className="greeting-banner">Hi, {name}</div>
    );
};