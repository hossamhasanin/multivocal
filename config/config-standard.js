

var baselibWelcome = {
  First: {
    Base: {Set: true},
    Criteria: "{{eq User.State.NumVisits 1}}"
  },

  Returning: {
    Base: {Set: true},
    Criteria: "{{gt User.State.NumVisits 1}}"
  }
};

var baselibUnknown = {
  First: {
    Base: {Set: true},
    Criteria: "{{eq (Val 'Session/Consecutive/Action.multivocal.unknown') 1}}"
  },

  Repeat: {
    Base: {Set: true},
    Criteria: [
      "{{gt (Val 'Session/Consecutive/Action.multivocal.unknown') 1}}",
      "{{lt (Val 'Session/Consecutive/Action.multivocal.unknown') 3}}"
    ]
  },

  Final: {
    Base: {Set: true},
    Criteria: "{{gte (Val 'Session/Consecutive/Action.multivocal.unknown') 3}}",
    ShouldClose: true
  }
};

var baselibAbout = {
  HasVersion: {
    Base: {Set: true},
    Criteria: "{{Config/Package/version}}"
  },
  NoVersion: {
    Base: {Set:true},
    Criteria: "{{not Config/Package/version}}"
  }
};

var baselib = {
  Welcome: baselibWelcome,
  About:   baselibAbout,
  Unknown: baselibUnknown
};

var undWelcome = [
  {Base:{Ref: 'Config/BaseLib/Welcome/First'}},
  "Welcome! What would you like to do?",

  {Base:{Ref: 'Config/BaseLib/Welcome/Returning'}},
  "Welcome back! What would you like to do?"
];

var undAbout = [
  {Base:{Ref: "Config/BaseLib/About/HasVersion"}},
  "This is {{Config/Package/name}} version {{Config/Package/version}}.",

  {Base:{Ref: "Config/BaseLib/About/NoVersion"}},
  "I'm just this great voice agent.",
  "There isn't much to say."
];

var undUnknown = [
  {Base:{Ref: 'Config/BaseLib/Unknown/First'}},
  "I'm sorry, I didn't get that.",

  {Base:{Ref: 'Config/BaseLib/Unknown/Repeat'}},
  "I'm sorry, but I'm not sure I understand.",

  {Base:{Ref: 'Config/BaseLib/Unknown/Final'}},
  "I still didn't understand. Perhaps another time."
];

var undRepeat = [
  "I said:"
];

var undQuit = [
  "Thanks for visiting! Hope to see you again."
];

var undDefault = [
  "Oh dear! I seem to be very confused."
];

module.exports = {
  Meta: {
    Name: 'Standard'
  },
  BaseLib: baselib,
  Local: {
    und: {
      Response: {
        "Action.multivocal.welcome": undWelcome,
        "Action.multivocal.about":   undAbout,
        "Action.multivocal.unknown": undUnknown,
        "Action.multivocal.repeat":  undRepeat,
        "Action.multivocal.quit":    undQuit,
        "Default":                   undDefault
      }
    }
  },
  Setting:{
    Requirements: {
      "Auth": {
        "https://accounts.google.com": {
          "KeysUrl": "https://www.googleapis.com/oauth2/v3/certs",
          "aud": "SET THIS TO YOUR CLIENT ID"
        }
      }
    }
  }
};