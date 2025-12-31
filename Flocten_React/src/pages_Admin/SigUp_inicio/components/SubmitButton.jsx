import { Loader2 } from 'lucide-react';

export const SubmitButton = ({ children, loading, className = 'btn btn-primary w-full' }) => (
  <button type="submit" className={className} disabled={loading}>
    {loading ? (
      <>
        <Loader2 className="size-5 animate-spin" />
        Loading...
      </>
    ) : (
      children
    )}
  </button>
);