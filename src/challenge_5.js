const descendingOrder = num => {
  
    if((num >= 0) && (Number.isInteger(num)) ) {
      return Number(num.toString().split('').sort((a, b) => b - a).join(''));
    }
    
  };
  
  console.log(descendingOrder(145263));