import React from 'react'


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
    if(top > h && !emailC.classList.contains('bring-front')){
      emailC.classList.add('bring-front');
    } else if (top < h && emailC.classList.contains('bring-front')){
      emailC.classList.remove('bring-front');
    }
    // let rows = document.getElementsByClassName('contentContainer')
    // let y1 = -(top/2);
    // let y2 = -(top*2);
    // let y3 = -(top);
    // console.log([y1, y2]);
    // rows[0].style.transform = 'translate3d(0px, ' + y1 + 'px, 0px)'
		// rows[1].setAttribute('style', 'transform: translate3d(0px, ' + y2 + 'px, 0px)');
    console.log([top, h]);
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

            <p onClick={()=>$("body").animate({ scrollTop: $('#topContainer').height() }, "slow")}>down</p>
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
