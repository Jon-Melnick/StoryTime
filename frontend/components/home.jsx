import React from 'react'
import { hashHistory } from 'react-router'


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewing: 'topContainer',
    }
  }

  updateGradient(){
    if ( $===undefined ) return;

  let c0_0 = this.colors[this.colorIndices[0]];
  let c0_1 = this.colors[this.colorIndices[1]];
  let c1_0 = this.colors[this.colorIndices[2]];
  let c1_1 = this.colors[this.colorIndices[3]];

  let istep = 1 - this.step;
  let r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
  let g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
  let b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
  let color1 = "rgb("+r1+","+g1+","+b1+")";

  let r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
  let g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
  let b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
  let color2 = "rgb("+r2+","+g2+","+b2+")";

   $('#infoContainer').css({
     background: "-webkit-gradient(linear, left top, right bottom, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

    this.step += this.gradientSpeed;
    if ( this.step >= 1 )
    {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      //pick two new target color indices
      //do not pick the same as the current one
      this.colorIndices[1] = ( this.colorIndices[1] + Math.floor( 1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
      this.colorIndices[3] = ( this.colorIndices[3] + Math.floor( 1 + Math.random() * (this.colors.length - 1))) % this.colors.length;

    }

  }

  componentDidMount(){
    this.colors = [[62,35,255],
                   [60,255,60],
                   [255,35,98],
                   [45,175,230],
                   [255,0,255],
                   [255,128,0]],
    this.step = 0,
    this.colorIndices = [0,1,2,3],
    this.gradientSpeed = 0.002,
    // this.interval = setInterval(this.updateGradient.bind(this),10);
    // window.addEventListener("resize", this.resize);
    window.addEventListener("scroll", this.reposition);
    this.resize();
  }

  componentWillUnmount(){
    clearInterval(this.interval)
    window.removeEventListener('scroll', this.reposition);
    // window.removeEventListener("resize", this.resize);
  }

  resize(){
    this.containerHeight = $(window).height();
    $(".contentContainer").css("min-height",this.containerHeight)
    window.scrollBy(0,0)
  }

  reposition(e){
    // console.log($('body').height())
    let top = e.currentTarget.pageYOffset;
    let h = $(window).height();
    let emailC = document.getElementById('email-section');
    let welcome = document.getElementById('welcome')
    if(top > h && !emailC.classList.contains('bring-front')){
      emailC.classList.add('bring-front');
      welcome.classList.add('hide-tab');
    } else if (top < h && emailC.classList.contains('bring-front')){
      emailC.classList.remove('bring-front');
      welcome.classList.remove('hide-tab');
    }
    // let rows = document.getElementsByClassName('contentContainer')
    // let y1 = -(top/2);
    // let y2 = -(top*2);
    // let y3 = -(top);
    // console.log([y1, y2]);
    // rows[0].style.transform = 'translate3d(0px, ' + y1 + 'px, 0px)'
		// rows[1].setAttribute('style', 'transform: translate3d(0px, ' + y2 + 'px, 0px)');
    // console.log([top, h]);
    // rows[2].setAttribute('style', 'transform: translate3d(0px, ' + y3 + 'px, 0px)');
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
    $("body").animate({ scrollTop: $(document).height() }, "slow");

    // let h = $(window).height() * 2;
    // window.scroll(0,h);
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

  holderFeature(){
    return <a href='' onClick={(e)=>{
        e.preventDefault();
        $("body").animate({ scrollTop: $('#topContainer').height() }, "slow")}}><p>Features</p></a>
  }

  render(){

    let topBG = {backgroundImage: 'url(http://res.cloudinary.com/arkean/image/upload/v1478209602/old-books-stacked-1391967856oLM_cmwok0.jpg)'}
    return(
      <div>
        <div className='contentContainer' id='topContainer' style={topBG}>
          <div id="welcome" className='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2 opaque'>
            <h1 className='page-header'>Welcome to Epic Story Time</h1>
            <p className='size22'>{"Ever wanted to write a fantastic story, filled with excitement and adventure but you can't find the time or energy? Sounds like EpicStoryTime is for you. With this web application, you can start a story and invite friends or other authors to join you and collaborate on an endless journey. Feeling stuck? No worries! Each author is given five random words based on the story's genre to help guide you. Each section that is written must include at least one of the words. While the story may never be how you expected, with so many minds coming together, it will be an exciting read as it is manifested."}</p>

          <br/>
          <br/>

          <h4>Thank you for checking out Epic Story Time: alpha.
              While this webpage is being updated go ahead and start writing stories,
              adding words to the different genres and if you have any questions or comments,
              feel free to <a href='' onClick={this.scrollTo.bind(this)}>email me</a>.</h4>

            <h4>Thanks again,</h4>

            <h4>Developer Jon</h4>
          </div>
        </div>

        <div className='contentContainer' id='infoContainer'>
          <div className='container'>
            <h1 className='page-header'>Features</h1>

            <div className='col-md-4 col-xs-4 feature'>
              <img src='http://res.cloudinary.com/arkean/image/upload/v1479593687/genres_x5ihky.png' height='150'/>  <h2>Genres</h2>
              <p>Choose from 4 different genres, look through their words, and add any that you think fit that style.</p>
              </div>

            <div className='col-md-4 col-xs-4 feature'>
              <img src='http://res.cloudinary.com/arkean/image/upload/v1479595888/Screen_Shot_2016-11-19_at_2.50.57_PM_nt8wbu.png' height='150'/>

              <h2>Social</h2>

              <p>Friend other authors and easily add them or other authors to your stories. See how active they are by viewing their total contributions.</p>
            </div>

            <div className='col-md-4 col-xs-4'>
              <img src='http://res.cloudinary.com/arkean/image/upload/v1479596880/fork-in-the-road_300_sdqbq4.jpg' height='150'/>

              <h2>Coming Soon</h2>

              <p>More genres and the ability to start your story off as a 'Choose your own adventure', allowing you to add choices to the end of each of your written contributions. </p>
            </div>
          </div>
        </div>

        <div className='contentContainer' id="email-section">
          <div id='email-content' className='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2'>
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

        <div className='contentContainer' id="filler-section">
          <div className='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2'>
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default Home;
