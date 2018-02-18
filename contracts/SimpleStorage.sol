pragma solidity ^0.4.18;
    
    contract SimpleStorage {
      
  //  this specifies the variables for the representation of the phsical canvas.
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
    
    address canvasAddress;
  
    //this is used to track the pixels on the canvas.
    struct PixelProperty {
    uint pixelIndex; //this reperesents the location of the pixel on the canvas.
    string pixelColor;
    string pixelStatus;
    address ownerAddress;
    }
    PixelProperty[] public pixelProperties;
   // This function is used to recieve pixel changes from the front end and update our store(pixelProperties)
   // I am expecting the call of this to be:
   // web3.eth.sendTransaction({from: ..., to: addressOfE, data: {pixelIndex:123, pixelColor: FF0000}}});
    function UpdatePixels(uint incomingPixelIndex, string incomingPixelColor, string incomingPixelStatus) public {
      address adr;
      adr = msg.sender;
      PixelProperty memory pixelProperty = PixelProperty(incomingPixelIndex, incomingPixelColor, incomingPixelStatus, adr); 
      pixelProperties.push(pixelProperty);
    }

  function getPixelProperty() public view returns (PixelProperty[]) {
    return pixelProperties;
 }  

   function getLatestCanvas() public view returns (string) {
    return pixelProperties[0].pixelColor;
 }  

}
