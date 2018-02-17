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


        // this is the function that runs first to set up the canvas state.
     function CanvasProperties(address recipientAddress, string canvasName, uint canvasWidth, uint canvasHeight) public {    
        CanvasAddress = recipientAddress; 
        canvas[CanvasAddress].canvasName = canvasName;
        canvas[CanvasAddress].canvasWidth = canvasWidth;
        canvas[CanvasAddress].canvasHeight = canvasHeight;
    }

    //


  function get() public view returns (address) {
    return CanvasAddress;
  }
}
