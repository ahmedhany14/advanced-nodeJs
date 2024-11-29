// How event loops works in nodeJs run time


// start program from terminal

const pendingTimers = []; // timers that are waiting to be executed
const pendingOSTasks = []; // tasks that are waiting to be executed
const pendingOperations = []; // operations that are waiting to be

function shouldRun(): boolean {
    // 1) Check one: Any pending setTimeout, setInterval, setImmediate?
    // 2) Check two: Any pending OS tasks? (like server listening to port)
    // 3) Check three: Any pending long running operations? (like fs module)

    return (pendingTimers.length || pendingOSTasks.length || pendingOperations.length) > 0;
}



// let's imagin that this is the main event loop
while (shouldRun()) {

    // 1) Node looks at pendingTimers and sees if any functions are ready to be called

    // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

    // 3) Pause execution. Continue when...
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    // 4) Look at pendingTimers. Call any setImmediate

    // 5) Handle any 'close' events
    /*
        readStream.on('close', () => {
            console.log('Stream has been closed');
        }

        on('close') event is emitted when the stream is closed
        at the end of the event loop, the close event is emitted
    */

}


// exit to terminal