import Swal from "sweetalert2";

const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
      popup: "shadow-lg rounded-xl text-white font-semibold text-sm",
    },
  });

  // Gradient background according to icon
  let bgStyle = "";
  let textColor = "#fff";

  switch (icon) {
    case "success":
      bgStyle = "linear-gradient(to right, #16a34a, #4ade80)"; 
      break;
    case "error":
      bgStyle = "linear-gradient(to right, #dc2626, #f87171)"; 
      break;
    case "warning":
      bgStyle = "linear-gradient(to right, #ca8a04, #facc15)"; 
      textColor = "#000";
      break;
    case "info":
      bgStyle = "linear-gradient(to right, #2563eb, #60a5fa)";
      break;
    default:
      bgStyle = "linear-gradient(to right, #1f2937, #4b5563)"; 
  }

  Toast.fire({
    icon,
    title,
    background: bgStyle,
    color: textColor,
    iconColor: "#fff", 
    width: "350",
  });
};

export default showToast;
