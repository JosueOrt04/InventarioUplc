import { Loader2 } from "lucide-react";

const SubmitButton = ({ loading, children, ...props }) => {
  return (
    <button
      type="submit"
      className="btn btn-primary w-full"
      disabled={loading}
      {...props}
    >
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
};

export default SubmitButton;