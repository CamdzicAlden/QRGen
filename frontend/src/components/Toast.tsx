interface ToastProps {
  message: string;
  type: "success" | "error";
}

function Toast({ message, type }: ToastProps) {
  return (
    <div
      className={`fixed bottom-4 right-4 p-[clamp(0.1rem,4vh,10rem)] rounded-2xl shadow-lg bg-white border border-black/20 ${type === "success" ? "text-green-500" : "text-red-500"} animate-slideInRight`}
    >
      {message}
    </div>
  );
}

export default Toast;
