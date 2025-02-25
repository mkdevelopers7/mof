function Button({ children, onClick, type, color }) {
  const styles = {
    primary:
      "uppercase font-semibold py-2 px-4 text-sm rounded-full hover:bg-green-600 bg-green-500 text-slate-200 transition-all duration-300",
    medium:
      "uppercase font-semibold py-2 px-4 text-xs rounded-full hover:bg-green-600 bg-green-500 text-slate-200 transition-all duration-300",
    sidebar: `uppercase font-semibold py-2 px-4 text-xs rounded-full hover:bg-${color}-600  text-slate-200 transition-all duration-300 bg-${color}-500`,
  };

  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
