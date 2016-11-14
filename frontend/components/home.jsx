import React from 'react'


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewing: 'topContainer',
    }
  }

  componentDidMount(){
    // window.addEventListener("resize", this.resize);
    // window.addEventListener("scroll", this.reposition);
    // this.resize();
  }

  componentWillUnmount(){
    // window.removeEventListener("resize", this.resize);
  }

  resize(){
    this.containerHeight = $(window).height();
    $(".contentContainer").css("min-height",this.containerHeight)
    window.scrollBy(0,0)
  }

  reposition(e){
    console.log($('body').height())
    let top = e.currentTarget.pageYOffset;
    let h = $(window).height();
    let rows = document.getElementsByClassName('contentContainer')
    let y1 = -(top/2);
    let y2 = -(top*2);
    let y3 = -(top);
    console.log([y1, y2]);
    rows[0].style.transform = 'translate3d(0px, ' + y1 + 'px, 0px)'
		rows[1].setAttribute('style', 'transform: translate3d(0px, ' + y2 + 'px, 0px)');
    console.log([top, h]);
    rows[2].setAttribute('style', 'transform: translate3d(0px, ' + y3 + 'px, 0px)');
    // console.log(top)
  }

  holder(){
    let prevHeight = $(".row").height();
    let windowTop = $(window).scrollTop();
    let newHeight = $(".row").height();

    window.scrollTo(0, (windowTop/prevHeight)*newHeight)
  }

  dontMove(){
    window.scroll(0, this.findPos(document.getElementById(this.state.viewing)));
  }

  scrollTo(e){
    e.preventDefault();
    window.scroll(0, this.findPos(document.getElementById('email')));
  }

  findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
  }

  log(e){
    e.preventDefault();
    console.log(window);
  }

  render(){

    let topBG = {backgroundImage: 'url(http://res.cloudinary.com/arkean/image/upload/v1478209602/old-books-stacked-1391967856oLM_cmwok0.jpg)'}
    return(
      <div>
        <div className='contentContainer' id='topContainer' style={topBG}>
          <div className='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2 opaque'>
            <h1>Welcome to Epic Story Time</h1>
            <p>Thank you for checking out Epic Story Time: alpha.
              While this webpage is being updated go ahead and start writing stories,
              adding words to the different genres and if you have any questions or comments,
              feel free to <a href='' onClick={this.scrollTo.bind(this)}>email me</a>.</p>

            <p>Thanks again.</p>

            <p>Developer Jon</p>

            <p onClick={()=>window.scrollBy(0, window.innerHeight+2)}>down</p>
          </div>
        </div>

        <div className='contentContainer' id='infoContainer'>
          <div className='container'>
            <h1>Stuff</h1>
            <p>Here I will mostly likely display features such as different genres, adding friends and authors, and maybe a third thing... such as the possible soon addition of creating a "choose your own adventure" style story build, too.</p>
            <div className='col-md-4 col-xs-4'>Genres</div>
            <div className='col-md-4 col-xs-4'>Features</div>
            <div className='col-md-4 col-xs-4'>Coming soon...</div>
          </div>
        </div>

        <div className='contentContainer' id="email-section">
          <div className='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2'>
            <div>
              <h1>Contact me!</h1>
              <p>If you have any questions, comments, or suggestion just send me a message.</p>
              <form method="post"
                    action="https://formspree.io/jonmelnick@hotmail.com">

                <div className='form-group'>
                  <label className='control-label' for="name">Name</label>
                  <input className='form-control' type="text" name="name" id="name" />
                </div>

                <div className='form-group'>
                  <label className='control-label' for="email">Email</label>
                  <input className='form-control' type="text" name="email" id="email" />
                </div>

                <div className='form-group'>
                  <label className='control-label' for="message">Message</label>
                  <textarea className='form-control' name="message" id="message" rows="5"></textarea>
                </div>

                <button href="mailto:jonmelnick@hotmail.com" className="btn btn-lg">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default Home;
