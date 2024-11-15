import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useGSAP } from "@gsap/react";
import { isMobile } from "react-device-detect";
import useSound from "use-sound";
import Confetti from "react-confetti";
import backgroundImage from "./assets/background.PNG";
import table1Image from "./assets/table1.png";
import table2Image from "./assets/table2.png";
import intro1Image from "./assets/intro1.PNG";
import intro2Image from "./assets/intro2.PNG";
import intro3Image from "./assets/intro3.PNG";
import dialog1Image from "./assets/dialog1.PNG";
import dialog2Image from "./assets/dialog2.PNG";
import gumiImage from "./assets/gumi.png";
import staff1Image from "./assets/staff1.png";
import staff2Image from "./assets/staff2.png";
import staff3Image from "./assets/staff3.png";
import staff4Image from "./assets/staff4.png";
import staff5Image from "./assets/staff5.png";
import staff6Image from "./assets/staff6.png";
import staff7Image from "./assets/staff7.png";
import staff8Image from "./assets/staff8.png";
import staff9Image from "./assets/staff9.png";
import staff10Image from "./assets/staff10.png";
import staff11Image from "./assets/staff11.png";
import staff12Image from "./assets/staff12.png";
import staff13Image from "./assets/staff13.png";
import staff14Image from "./assets/staff14.png";
import aggieImage from "./assets/aggie.png";
import cakeImage from "./assets/cake.png";
import orderImage from "./assets/order.png";
import pawImage from "./assets/paw.png";
import partySfx from "./assets/party.mp3";
import clickSfx from "./assets/click.mp3";
import backgroundSfx from "./assets/background.mp3";

function App() {
  const size = useWindowSize();
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [isIntroEnd, setIsIntroEnd] = useState(false);
  const [isDialogEnd, setIsDialogEnd] = useState(false);
  const [isCakeTime, setIsCakeTime] = useState(false);
  const [isPartyStart, setIsPartyStart] = useState(false);
  const backgroundAudioRef = useRef(new Audio(backgroundSfx));

  useEffect(() => {
    if (isFirstClick) {
      if (isIntroEnd && !isPartyStart) {
        backgroundAudioRef.current.volume = 0.25;
        backgroundAudioRef.current.play();
      }

      if (isPartyStart) {
        backgroundAudioRef.current.pause();
      }
    }
  }, [isIntroEnd, isPartyStart, isFirstClick, backgroundAudioRef]);

  if (!isMobile) {
    return (
      <div>
        <h1>Sorry, this page is only available on mobile devices.</h1>
      </div>
    );
  }

  if (size.width > size.height) {
    return (
      <div>
        <h1>Sorry, this page is only available in portrait mode.</h1>
      </div>
    );
  }

  return (
    <div>
      <Intro setIsIntroEnd={setIsIntroEnd} />
      <Dialog
        isIntroEnd={isIntroEnd}
        isDialogEnd={isDialogEnd}
        setIsFirstClick={setIsFirstClick}
        setIsDialogEnd={setIsDialogEnd}
      />
      <div className="scale-[1.15]">
        <Cake isCakeTime={isCakeTime} setIsPartyStart={setIsPartyStart} />
        <Order isDialogEnd={isDialogEnd} setIsCakeTime={setIsCakeTime} />
        <Party isDialogEnd={isDialogEnd} isPartyStart={isPartyStart} />
        <Background />
      </div>
      {isPartyStart && (
        <div className="fixed top-0 left-0 z-50">
          <Confetti
            width={size.width}
            height={size.height}
            numberOfPieces={500}
            gravity={0.05}
          />
        </div>
      )}
    </div>
  );
}

function Intro({ setIsIntroEnd }) {
  const introRef = useRef();
  const intro1Ref = useRef();
  const intro2Ref = useRef();
  const intro3Ref = useRef();

  const intro1Style = {
    backgroundImage: `url(${intro1Image})`,
  };

  const intro2Style = {
    backgroundImage: `url(${intro2Image})`,
  };
  const intro3Style = {
    backgroundImage: `url(${intro3Image})`,
  };

  //gsap animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(intro1Ref.current, { duration: 1, opacity: 0, delay: 2 })
      .to(intro2Ref.current, { duration: 1, opacity: 0, delay: 0 })
      .to(intro3Ref.current, { duration: 1, opacity: 0, delay: 2 })
      .call(
        () => {
          setIsIntroEnd(true);
        },
        null,
        6
      )
      .call(
        () => {
          introRef.current.style.display = "none";
        },
        null,
        7
      );
  }, {});

  return (
    <div className="fixed top-0 left-0 z-50" ref={introRef}>
      <div
        className="absolute top-0 left-0 z-50 w-screen h-[90vh] bg-contain bg-center bg-no-repeat bg-white overflow-visible"
        style={intro1Style}
        ref={intro1Ref}
      >
        <div className="absolute top-[90vh] left-0 w-screen h-[10vh] bg-white "></div>
      </div>
      <div
        className="absolute top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat bg-[#fdf2e3] overflow-visible"
        style={intro2Style}
        ref={intro2Ref}
      >
        <div className="absolute top-[90vh] left-0 w-screen h-[10vh] bg-[#fdf2e3] "></div>
      </div>
      <div
        className="absolute top-0 left-0 z-30 w-screen h-[90vh] bg-contain bg-center bg-no-repeat bg-[#fdf2e3] overflow-visible"
        style={intro3Style}
        ref={intro3Ref}
      >
        <div className="absolute top-[90vh] left-0 w-screen h-[10vh] bg-[#fdf2e3] "></div>
      </div>
    </div>
  );
}

function Dialog({ isIntroEnd, isDialogEnd, setIsFirstClick, setIsDialogEnd }) {
  const size = useWindowSize();

  const dialogRef = useRef();
  const dialog1Ref = useRef();
  const dialog2Ref = useRef();
  const [playClick] = useSound(clickSfx, { volume: 0.5 });

  const dialog1Style = {
    backgroundImage: `url(${dialog1Image})`,
  };

  const dialog2Style = {
    backgroundImage: `url(${dialog2Image})`,
  };

  //gsap animation
  useGSAP(
    () => {
      if (isIntroEnd) {
        const tl = gsap.timeline();

        tl.to(dialogRef.current, {
          duration: 2,
          translateY: 0,
          ease: "none",
        }); // 7 second delay of intro
      } else {
        gsap.set(dialogRef.current, { translateY: size.height });
      }
    },
    { dependencies: [isIntroEnd, size] }
  );

  useGSAP(
    () => {
      if (isDialogEnd) {
        const tl = gsap.timeline();

        tl.to(dialogRef.current, {
          duration: 2,
          translateY: size.height,
          ease: "none",
        }).call(() => {
          dialogRef.current.style.display = "none";
        });
      }
    },
    { dependencies: [isDialogEnd, size] }
  );

  return (
    <div className="fixed top-0 left-0 z-40" ref={dialogRef}>
      <div
        className="absolute top-0 left-0 z-50 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
        style={dialog1Style}
        ref={dialog1Ref}
        onClick={() => {
          playClick();
          setIsFirstClick(true);
          dialog1Ref.current.style.display = "none";
        }}
      ></div>
      <div
        className="absolute top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
        style={dialog2Style}
        onClick={() => {
          playClick();
          setIsDialogEnd(true);
        }}
      ></div>
    </div>
  );
}

function Background() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div
      className="fixed top-0 left-0 -z-50 w-screen h-[90vh] bg-cover bg-center bg-no-repeat bg-[#e6d8ac]"
      style={backgroundStyle}
    >
      <div className="absolute top-[90vh] left-0 w-screen h-[10vh] bg-[#e6d8ac] "></div>
    </div>
  );
}

function Party({ isDialogEnd, isPartyStart }) {
  const size = useWindowSize();
  const aggieRef = useRef();
  const [playParty] = useSound(partySfx, { volume: 0.25 });
  const table1Style = {
    backgroundImage: `url(${table1Image})`,
  };
  const gumiStyle = {
    backgroundImage: `url(${gumiImage})`,
  };
  const staff1Style = {
    backgroundImage: `url(${staff1Image})`,
  };
  const staff2Style = {
    backgroundImage: `url(${staff2Image})`,
  };
  const staff3Style = {
    backgroundImage: `url(${staff3Image})`,
  };
  const staff4Style = {
    backgroundImage: `url(${staff4Image})`,
  };
  const staff5Style = {
    backgroundImage: `url(${staff5Image})`,
  };
  const staff6Style = {
    backgroundImage: `url(${staff6Image})`,
  };
  const table2Style = {
    backgroundImage: `url(${table2Image})`,
  };
  const staff7Style = {
    backgroundImage: `url(${staff7Image})`,
  };
  const staff8Style = {
    backgroundImage: `url(${staff8Image})`,
  };
  const staff9Style = {
    backgroundImage: `url(${staff9Image})`,
  };
  const staff10Style = {
    backgroundImage: `url(${staff10Image})`,
  };
  const staff11Style = {
    backgroundImage: `url(${staff11Image})`,
  };
  const staff12Style = {
    backgroundImage: `url(${staff12Image})`,
  };
  const staff13Style = {
    backgroundImage: `url(${staff13Image})`,
  };
  const staff14Style = {
    backgroundImage: `url(${staff14Image})`,
  };
  const aggieStyle = {
    backgroundImage: `url(${aggieImage})`,
  };

  //gsap animation
  useGSAP(
    () => {
      if (isDialogEnd) {
        const tl = gsap.timeline();

        tl.set(aggieRef.current, { opacity: 1 }, 1)
          .to(
            aggieRef.current,
            {
              duration: 1.5,
              translateX: (9 / 128) * (85 / 100) * size.height,
              translateY: (((-1 / 8) * 85) / 100) * size.height,
              ease: "none",
              delay: 1.5,
            },
            0
          )
          .to(aggieRef.current, {
            duration: 1.5,
            translateX: 0,
            translateY: 0,
            ease: "none",
          })
          .to(
            ".staffLeft",
            {
              duration: 4,
              translateX: 0,
              ease: "none",
              delay: 1,
            },
            0
          )
          .to(
            ".staffRight",
            {
              duration: 4,
              translateX: 0,
              ease: "none",
              delay: 1,
            },
            0
          );
      } else {
        gsap.set(".staffLeft", { translateX: -size.width });
        gsap.set(".staffRight", { translateX: size.width });
        gsap.set(aggieRef.current, {
          translateX: (9 / 128) * (85 / 100) * size.height,
          translateY: (((-7 / 32) * 85) / 100) * size.height,
          opacity: 0,
        });
      }
    },
    { dependencies: [isDialogEnd, size] }
  );

  useGSAP(
    () => {
      if (isPartyStart) {
        const tl = gsap.timeline({ repeat: -1 });

        playParty();

        tl.to(
          ".staffEven",
          {
            duration: 0.25,
            translateY: (-1 / 64) * size.height,
          },
          0
        )
          .to(".staffEven", {
            duration: 0.25,
            translateY: 0,
            ease: "power1.in",
          })
          .to(
            ".staffOdd",
            {
              duration: 0.25,
              translateY: (-1 / 64) * size.height,
            },
            0.5
          )
          .to(".staffOdd", {
            duration: 0.25,
            translateY: 0,
            ease: "power1.in",
          })
          .to(
            aggieRef.current,
            {
              duration: 0.25,
              translateY: (-1 / 64) * size.height,
            },
            1
          )
          .to(aggieRef.current, {
            duration: 0.25,
            translateY: 0,
            ease: "power1.in",
          });
      }
    },
    { dependencies: [isPartyStart, size] }
  );

  return (
    <div className="fixed top-0 left-0 -z-40">
      <div
        className="absolute top-0 left-0 z-50 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
        style={table1Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffEven"
        style={gumiStyle}
      ></div>
      <div
        className="absolute top-0 left-0 z-30 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffRight staffOdd"
        style={staff1Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-20 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffRight staffEven"
        style={staff2Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-20 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffRight staffOdd"
        style={staff3Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffEven"
        style={staff4Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffOdd"
        style={staff5Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-30 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffEven"
        style={staff6Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-10 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
        style={table2Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-0 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
        style={aggieStyle}
        ref={aggieRef}
      ></div>
      <div
        className="absolute top-0 left-0 z-0 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffOdd"
        style={staff7Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-0 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffEven"
        style={staff8Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-0 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffOdd"
        style={staff9Style}
      ></div>
      <div
        className="absolute top-0 left-0 -z-10 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffEven"
        style={staff10Style}
      ></div>
      <div
        className="absolute top-0 left-0 -z-10 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffLeft staffOdd"
        style={staff11Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-0 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffRight staffEven"
        style={staff12Style}
      ></div>
      <div
        className="absolute top-0 left-0 z-0 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffRight staffOdd"
        style={staff13Style}
      ></div>
      <div
        className="absolute top-0 left-0 -z-10 w-screen h-[90vh] bg-contain bg-center bg-no-repeat staffRight staffEven"
        style={staff14Style}
      ></div>
    </div>
  );
}

function Order({ isDialogEnd, setIsCakeTime }) {
  const size = useWindowSize();
  const orderRef = useRef();
  const pawRef = useRef();
  const clickBoxRef = useRef();
  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const orderStyle = {
    backgroundImage: `url(${orderImage})`,
  };
  const pawStyle = {
    backgroundImage: `url(${pawImage})`,
  };

  useGSAP(
    () => {
      if (isDialogEnd) {
        const tl = gsap.timeline();
        const orderTl = gsap.timeline({ repeat: -1 });
        const pawTl = gsap.timeline({ repeat: -1 });

        orderTl
          .to(orderRef.current, { scale: 1.025, duration: 0.15 })
          .to(orderRef.current, { scale: 1, duration: 0.15 })
          .to(orderRef.current, { scale: 1.025, duration: 0.15 })
          .to(orderRef.current, { scale: 1, duration: 0.15 })
          .to(orderRef.current, { scale: 1, duration: 1 });

        pawTl
          .to(pawRef.current, {
            translateY: (1 / 32) * size.height,
            duration: 0.5,
            ease: "none",
          })
          .to(pawRef.current, { translateY: 0, duration: 0.5, ease: "none" });

        tl.call(
          () => {
            orderRef.current.style.display = "block";
            pawRef.current.style.display = "block";
          },
          null,
          6
        ) // 4.5 seconds for aggie to reach the table
          .from(orderRef.current, {
            duration: 1,
            opacity: 0,
          })
          .call(
            () => {
              clickBoxRef.current.style.display = "flex";
            },
            null,
            7
          ) // 4.5 seconds for aggie to reach the table
          .from(
            pawRef.current,
            {
              duration: 1,
              opacity: 0,
              delay: 5,
            },
            7
          )
          .add(orderTl, 7)
          .add(pawTl, 7)
          .set(clickBoxRef.current, { translateY: -(1 / 16) * size.height }, 7);
      }
    },
    { dependencies: [isDialogEnd, size] }
  );

  return (
    <>
      <div
        className="hidden fixed top-0 left-0 z-30 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
        style={orderStyle}
        ref={orderRef}
      ></div>
      <div
        className="hidden fixed top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat justify-center items-center"
        style={pawStyle}
        ref={pawRef}
      ></div>
      {/* Click box */}
      <div
        className="hidden fixed top-0 left-0 z-50 w-screen h-[90vh] justify-center items-center"
        ref={clickBoxRef}
      >
        <div
          className="h-1/6 aspect-[5/6] opacity-30"
          onClick={() => {
            playClick();
            setIsCakeTime(true);
            orderRef.current.style.display = "none";
            pawRef.current.style.display = "none";
            clickBoxRef.current.style.display = "none";
          }}
        ></div>
      </div>
    </>
  );
}

function Cake({ isCakeTime, setIsPartyStart }) {
  const size = useWindowSize();
  const cakeRef = useRef();
  const cakeStyle = {
    backgroundImage: `url(${cakeImage})`,
  };

  useGSAP(
    () => {
      if (isCakeTime) {
        const tl = gsap.timeline();

        tl.to(cakeRef.current, {
          duration: 1,
          translateX: 0,
          translateY: 0,
          delay: 0.5,
        }).call(
          () => {
            setIsPartyStart(true);
          },
          null,
          ">+1"
        ); // 2 seconds after cake is placed
      } else {
        gsap.set(cakeRef.current, {
          translateX: size.width,
          translateY: (1 / 6) * size.height,
        });
      }
    },
    { dependencies: [isCakeTime, size] }
  );

  return (
    <div
      className="fixed top-0 left-0 z-40 w-screen h-[90vh] bg-contain bg-center bg-no-repeat"
      style={cakeStyle}
      ref={cakeRef}
    ></div>
  );
}

export default App;
