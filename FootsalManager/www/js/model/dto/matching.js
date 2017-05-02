matching = function(data) {

  this.idx = null;
  this.regteam = null;
  this.oppteam = null;
  this.content = null;
  this.oppid = null;
  this.regid = null;
  this.opp_YN = null;
  this.reg_YN = null;
  this.hopeTime = null;
  this.position = null;
  this.regnumber = null;
  this.oppnumber = null;
  this.regemblem = null;
  this.oppemblem = null;
  this.regteamnum = null;

  if (data != null) {
    this.idx = data.idx;
    this.regteam = data.regteam;
    this.oppteam = data.oppteam;
    this.content = data.content;
    this.oppid = data.oppid;
    this.regid = data.regid;
    this.opp_YN = data.opp_YN;
    this.reg_YN = data.reg_YN;
    this.hopeTime = data.hopeTime;
    this.position = data.position;
    this.regnumber = data.regnumber;
    this.oppnumber = data.oppnumber;
    this.regemblem = data.regemblem;
    this.oppemblem = data.oppemblem;
    this.regteamnum = data.regteamnum;
  }

};
