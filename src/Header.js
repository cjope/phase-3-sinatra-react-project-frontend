function Header({ group }) {
  return (
    <div className="header-main">
      <div className="header-app">
        <h1>TASK APP</h1>
      </div>
      <span className="header-group">
        <h1>{group.name}</h1>
        <p className="icon">{group.emoji}</p>
      </span>
    </div>
  );
}
export default Header;
