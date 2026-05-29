// Define a reusable component for displaying empty or insufficient data states

type EmptyStateProps = {
    title?: string;
    message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
    return (
        <div>
            {title && <h3>{title}</h3>}
            <p>{message}</p>
        </div>
    );
}