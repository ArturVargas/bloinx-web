pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Groups {

    enum Stages {   //Stages of the round
        setup,      //receive the initial fees
        save,     //receive payments for stage number 1
        pay,      //send savings to user in 1rst number
        finished  //all users Withdrew their saving
    }
    
    struct User {
        uint256 userId;
        string userName;
        address payable userAddr;
        bool cashInFlag;
        bool saveAmountFlag;
    }
    
    struct Room {
        uint256 roomId;
        User user;
    }
    
    mapping(address => User) public users;
    mapping(uint => Room) public rooms;
    uint roomCounter = 1;
    uint usersCounter = 0;
    uint cashIn;
    uint saveAmount; //Monto de ahorro periodicamente
    uint groupSize;
    uint CashInPayeesCount = 0;
    uint saveAmountPayeesCount = 0;  //Cantidad de pagos que se realizan por stage
    uint cycle = 0;   //Sirve para saber el usuario en turno
    uint totalSaveAmount = 0;  //Monto del ahorro logrado en la tanda
    uint totalCashIn = 0;

    Stages stage;

    User[] usersList;
    Room[] roomsList;

    address payable public admin;

    modifier isUsersTurn() {
        require(msg.sender == usersList[cycle].userAddr, "Debes esperar tu turno para retirar");
        _;
    }

    modifier isRegisteredUser() {
        require(msg.sender == users[msg.sender].userAddr, "Usuario no registrado");
        _;
    }

    constructor(uint _cashIn, uint _saveAmount, uint8 _groupSize) public {
        admin = msg.sender;
        cashIn = _cashIn;
        saveAmount = _saveAmount;
        groupSize = _groupSize;
        stage = Stages.setup;
    }

    function registerUser(string memory _userName) public {
        require(stage == Stages.setup, "La tanda ya comenzo y no acepta nuevos usuarios");
        require(usersCounter < groupSize, "El grupo esta completo");
        usersCounter++;
        users[msg.sender] = User(usersCounter, _userName, msg.sender, false, false);
        usersList.push(users[msg.sender]);
    }

    function payFee() public isRegisteredUser payable {
        require(stage == Stages.setup, "Todos han pagado el fee exitosamente");
        require(users[msg.sender].cashInFlag == false, "Ya tenemos regisrado tu CashIn");
        require(msg.value >= cashIn, 'Fondos Insuficientes');
        totalCashIn = totalCashIn + msg.value;
        users[msg.sender].cashInFlag = true;
        CashInPayeesCount++;
        if (CashInPayeesCount == groupSize){
            admin.transfer(totalCashIn);
            CashInPayeesCount = 0;
            stage = Stages.save;
        }
    }


    function payRound() public isRegisteredUser payable {
        require(stage == Stages.save, "Espera una nueva ronda de ahorro");
        require(users[msg.sender].saveAmountFlag == false, "Ya ahorraste esta ronda");
        require(msg.value >= cashIn, 'Fondos Insuficientes');
        users[msg.sender].saveAmountFlag = true;
        saveAmountPayeesCount++;
        totalSaveAmount = totalSaveAmount + msg.value;
        if (saveAmountPayeesCount == groupSize){
            saveAmountPayeesCount = 0;
            stage = Stages.pay;            //La tanda puede pagarse si todos ahorraron en la ronda
        }
    }
    
    function WithdrawRound() public isRegisteredUser isUsersTurn payable {
        require(stage == Stages.pay, "Espera a que tengamos el monto de tu ahorro");     //Se debe estar en fase de pago
        stage = Stages.save;
        usersList[cycle].userAddr.transfer(totalSaveAmount);
        cycle++;
        stage = Stages.save;
        newRound();
        if(cycle > groupSize){
            stage = Stages.finished;
        }
    }

    function newRound() internal {          //*********Esta funcion no sirve bien*** Revisar
        for(uint8 i; i<groupSize; i++ ){
            usersList[i].saveAmountFlag = false;
        }
    }

}