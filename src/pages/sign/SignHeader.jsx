import SwitchThemeButton from "../../ui/SwitchThemeButton";

function SignHeader() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "end",
        borderBottom: "1px solid rgba(23, 42, 57, 0.214)",
      }}
    >
      <SwitchThemeButton />
    </header>
  );
}

export default SignHeader;
