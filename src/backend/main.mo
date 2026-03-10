import Text "mo:core/Text";

actor {
  type BusinessInfo = {
    name : Text;
    location : Text;
    phone : Text;
    proprietor : Text;
  };

  let businessInfo : BusinessInfo = {
    name = "Jaya Laxmi Transport";
    location = "Nakkhapot, Lalitpur, Nepal";
    phone = "9810200165";
    proprietor = "Krishna Prasad Shrestha";
  };

  public query ({ caller }) func getBusinessInfo() : async BusinessInfo {
    businessInfo;
  };
};
