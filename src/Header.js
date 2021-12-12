function Header({ header }) {
  return (
    <div className="header-main">
      <div className="header-app">
        <h1>TASK APP</h1>
      </div>
      <span className="header-group">
        <h1>{header.name}</h1>
        <p className="icon">{header.emoji}</p>
      </span>
    </div>
  );
}
export default Header;
