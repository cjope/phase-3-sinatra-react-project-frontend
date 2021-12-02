function Header({ activeGroup }) {
  return (
    <div className="header-main">
      <div className="header-app">
        <h1>TASK APP</h1>
      </div>
      <span className="header-group">
        <h1>{activeGroup.name}</h1>
        <p className="icon">{activeGroup.bicon}</p>
      </span>
    </div>
  );
}
export default Header;
