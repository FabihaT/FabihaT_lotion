function Header(event) {
    return ( //Return formatted page header
    <div className="page-header">
        <div className="head1">
          {/*Add event listener to button to toggle Column1*/}
          <button className="navbutton" onClick={event.sideButton}>&#9776;</button> 
        </div>
        <div className="head2">
          <h1>Lotion</h1>
          <p style={{color:'#59308c'}}>Like Notion, but worse.</p>
        </div>
        <div className="head3"></div>
    </div>
    );
}

export default Header;