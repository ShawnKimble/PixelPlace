pragma solidity ^0.4.18;

contract CanvasProperties {
  
    //global properties
    address CanvasAddress; //public key of the contract/canvas
    uint PixelChangeCount;
    uint128 PixelChangePrice;
   
    
    //this is used to track the pixels on the canvas.
    struct PixelProperty {
    uint pixelIndex; //this reperesents the location of the pixel on the canvas.
    string pixelColor;
    string pixelStatus;
    address ownerAddress;
    }
    //this specifies the variables for the representation of the phsical canvas.
    struct CanvasProps {
        string canvasName;   // Name of the canvas.
        uint canvasWidth;    // number of pixels for the canvas width.
        uint canvasHeight;    // number of pixels for the canvas height.
    }
    
    // This declares a state variable that
    // stores a `CanvasProps` struct for each possible address.
    mapping(address => CanvasProps) public canvas;


    // A dynamically-sized array of `PixelProperties` structs.
    //this is our store of the pixels on the canvas and their latest state.
    PixelProperty[] public pixelProperties;
 
    // this is the function that runs first to set up the canvas state.
     function CanvasProperties(string canvasName, uint canvasWidth, uint canvasHeight) public {    
        CanvasAddress = msg.sender; 
        canvas[CanvasAddress].canvasName = canvasName;
        canvas[CanvasAddress].canvasWidth = canvasWidth;
        canvas[CanvasAddress].canvasHeight = canvasHeight;
    }

    // This function is used to recieve pixel changes from the front end and update our store(pixelProperties)
    // I am expecting the call of this to be:
    // web3.eth.sendTransaction({from: ..., to: addressOfE, data: {pixelIndex:123, pixelColor: FF0000}}});
    function UpdatePixels(uint incomingPixelIndex, string incomingPixelColor, string incomingPixelStatus) public {
      pixelProperties.push(
        PixelProperty({
          ownerAddress: msg.sender,
          pixelIndex : incomingPixelIndex,
          pixelColor: incomingPixelColor,
          pixelStatus: incomingPixelStatus
          }));
          }

  function get() public view returns (address) {
    return CanvasAddress;
  }
}
