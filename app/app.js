angular
    .module("mobile-easyload", [])
    .controller('mainCtrl', mainController)

function mainController() {
  var vm = this;
  vm.init = init;
  vm.doEasyload = doEasyload;
  vm.getEasyloadRecordsFromLocalStorage = getEasyloadRecordsFromLocalStorage;
  vm.removeRecord = removeRecord;
  vm.editRecord = editRecord;
  vm.activeRecord = {};
  vm.aciveIndex = null;
  vm.easyloadRecords = [];


  //functions
  init();
  function init() {
    console.log("test")
    vm.easyloadRecords = vm.getEasyloadRecordsFromLocalStorage();
    console.log(vm.easyloadRecords)
  }

  function doEasyload(easyloadForm) {

    if (!vm.activeRecord.cellNumber || !vm.activeRecord.rupees) {
      return;
    }
    if (typeof (vm.aciveIndex) !== "number") {
      vm.activeRecord.date = (new Date()).toLocaleString();
      vm.easyloadRecords.push(vm.activeRecord);
    }
    else if (typeof (vm.aciveIndex) == "number") {
      vm.easyloadRecords.splice(vm.aciveIndex, 1, vm.activeRecord);
      vm.aciveIndex = null;
    }
    localStorage.setItem("easyloadData", JSON.stringify(vm.easyloadRecords));
    vm.easyloadRecords = vm.getEasyloadRecordsFromLocalStorage();

    vm.activeRecord = {};
    easyloadForm.$setSubmitted();
    easyloadForm.$setPristine();
    easyloadForm.$setUntouched();

    /*vm.easyloadForm.cellNumber.$setPristine();
     vm.easyloadForm.rupees.$setPristine();*/
  }

  function getEasyloadRecordsFromLocalStorage() {
    var data = localStorage.getItem("easyloadData");
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  }

  function removeRecord(index) {
    var allRecords = vm.getEasyloadRecordsFromLocalStorage();
    allRecords.splice(index, 1);
    localStorage.setItem("easyloadData", JSON.stringify(allRecords));
    vm.easyloadRecords = vm.getEasyloadRecordsFromLocalStorage();
  }

  function editRecord(index) {
    vm.aciveIndex = index;
    vm.easyloadRecords = vm.getEasyloadRecordsFromLocalStorage();
    vm.activeRecord = vm.easyloadRecords.slice(index, index + 1)[0];
  }

}