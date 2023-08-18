import React from "react";

const NotFound = () => {
    return (<>
        <div style={{
            alignContent: 'center',
            // position: 'relative',

        }}>
            <h1
                style={{
                    position: 'relative',
                    // top: '10%',
                    left: '40%',
                    fontSize: '42px',
                    color: '#434242'

                }}
            >
                Page Not Found
            </h1>
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/website-maintenance-error-4349578-3613907.png"
                style={{
                    // height:'60vh',
                    // width: '40vw',
                    position: 'relative',
                    left: '30%'
                }}
                alt="404 Page Not Found" />
            {/* <div style={{
            backgroundImage: `url('https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=600&name=shutterstock_774749455.jpg')`,
            height: '100vh',
            width: '100vw',
            marginTop: '-70px',
            fontSize: '50px',
            // backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>

    </div> */}
        </div>
    </>
    );
}

export default NotFound;