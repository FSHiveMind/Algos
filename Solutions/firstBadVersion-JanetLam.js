var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let checkV = Math.ceil(n / 2)
        let goodV = 0
        let badV = n
        // while good and bad are not next to each other, first bad not found
        while(goodV + 1 !== badV){
            // midpoint is false, so bad version has to be after
            if(!isBadVersion(checkV)){
                goodV = checkV
                checkV = Math.ceil((checkV + badV) / 2)
            }
            // midpoint is true, so bad version has to be before
             else{
                badV = checkV
                checkV = Math.ceil((checkV + goodV) / 2)
            }
        }
        return badV
    };
};