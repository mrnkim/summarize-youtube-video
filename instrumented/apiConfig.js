function cov_1gg72bgf1e() {
  var path = "/Users/Miranda/twelveLabs/Get-Inspiration-V2/src/apiConfig.js";
  var hash = "43042d0a3e3c8035a7c89cff7a348ae64e5da7a2";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Miranda/twelveLabs/Get-Inspiration-V2/src/apiConfig.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 24
        },
        end: {
          line: 5,
          column: 1
        }
      },
      "1": {
        start: {
          line: 7,
          column: 18
        },
        end: {
          line: 20,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "43042d0a3e3c8035a7c89cff7a348ae64e5da7a2"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1gg72bgf1e = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1gg72bgf1e();
import axios from "axios";
const SERVER_BASE_URL = (cov_1gg72bgf1e().s[0]++, new URL(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_PORT_NUMBER}`));
const apiConfig = (cov_1gg72bgf1e().s[1]++, {
  PAGE_LIMIT: 1,
  INDEX_ID: process.env.REACT_APP_INDEX_ID,
  SERVER: axios.create({
    baseURL: SERVER_BASE_URL.toString()
  }),
  INDEXES_URL: "/indexes",
  TASKS_URL: "/tasks",
  JSON_VIDEO_INFO_URL: "/json-video-info",
  CHANNEL_VIDEO_INFO_URL: "/channel-video-info",
  PLAYLIST_VIDEO_INFO_URL: "/playlist-video-info",
  DOWNLOAD_URL: "/download",
  UPDATE_VIDEO_URL: "/update"
});
export default apiConfig;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWdnNzJiZ2YxZSIsImFjdHVhbENvdmVyYWdlIiwiYXhpb3MiLCJTRVJWRVJfQkFTRV9VUkwiLCJzIiwiVVJMIiwicHJvY2VzcyIsImVudiIsIlJFQUNUX0FQUF9TRVJWRVJfVVJMIiwiUkVBQ1RfQVBQX1BPUlRfTlVNQkVSIiwiYXBpQ29uZmlnIiwiUEFHRV9MSU1JVCIsIklOREVYX0lEIiwiUkVBQ1RfQVBQX0lOREVYX0lEIiwiU0VSVkVSIiwiY3JlYXRlIiwiYmFzZVVSTCIsInRvU3RyaW5nIiwiSU5ERVhFU19VUkwiLCJUQVNLU19VUkwiLCJKU09OX1ZJREVPX0lORk9fVVJMIiwiQ0hBTk5FTF9WSURFT19JTkZPX1VSTCIsIlBMQVlMSVNUX1ZJREVPX0lORk9fVVJMIiwiRE9XTkxPQURfVVJMIiwiVVBEQVRFX1ZJREVPX1VSTCJdLCJzb3VyY2VzIjpbImFwaUNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbmNvbnN0IFNFUlZFUl9CQVNFX1VSTCA9IG5ldyBVUkwoXG4gIGAke3Byb2Nlc3MuZW52LlJFQUNUX0FQUF9TRVJWRVJfVVJMfToke3Byb2Nlc3MuZW52LlJFQUNUX0FQUF9QT1JUX05VTUJFUn1gXG4pO1xuXG5jb25zdCBhcGlDb25maWcgPSB7XG4gIFBBR0VfTElNSVQ6IDEsXG4gIElOREVYX0lEOiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfSU5ERVhfSUQsXG4gIFNFUlZFUjogYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiBTRVJWRVJfQkFTRV9VUkwudG9TdHJpbmcoKSxcbiAgfSksXG4gIElOREVYRVNfVVJMOiBcIi9pbmRleGVzXCIsXG4gIFRBU0tTX1VSTDogXCIvdGFza3NcIixcbiAgSlNPTl9WSURFT19JTkZPX1VSTDogXCIvanNvbi12aWRlby1pbmZvXCIsXG4gIENIQU5ORUxfVklERU9fSU5GT19VUkw6IFwiL2NoYW5uZWwtdmlkZW8taW5mb1wiLFxuICBQTEFZTElTVF9WSURFT19JTkZPX1VSTDogXCIvcGxheWxpc3QtdmlkZW8taW5mb1wiLFxuICBET1dOTE9BRF9VUkw6IFwiL2Rvd25sb2FkXCIsXG4gIFVQREFURV9WSURFT19VUkw6IFwiL3VwZGF0ZVwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBpQ29uZmlnO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU9FLEtBQUssTUFBTSxPQUFPO0FBRXpCLE1BQU1DLGVBQWUsSUFBQUgsY0FBQSxHQUFBSSxDQUFBLE9BQUcsSUFBSUMsR0FBRyxDQUM1QixHQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQXFCLElBQUdGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRSxxQkFBc0IsRUFDM0UsQ0FBQztBQUVELE1BQU1DLFNBQVMsSUFBQVYsY0FBQSxHQUFBSSxDQUFBLE9BQUc7RUFDaEJPLFVBQVUsRUFBRSxDQUFDO0VBQ2JDLFFBQVEsRUFBRU4sT0FBTyxDQUFDQyxHQUFHLENBQUNNLGtCQUFrQjtFQUN4Q0MsTUFBTSxFQUFFWixLQUFLLENBQUNhLE1BQU0sQ0FBQztJQUNuQkMsT0FBTyxFQUFFYixlQUFlLENBQUNjLFFBQVEsQ0FBQztFQUNwQyxDQUFDLENBQUM7RUFDRkMsV0FBVyxFQUFFLFVBQVU7RUFDdkJDLFNBQVMsRUFBRSxRQUFRO0VBQ25CQyxtQkFBbUIsRUFBRSxrQkFBa0I7RUFDdkNDLHNCQUFzQixFQUFFLHFCQUFxQjtFQUM3Q0MsdUJBQXVCLEVBQUUsc0JBQXNCO0VBQy9DQyxZQUFZLEVBQUUsV0FBVztFQUN6QkMsZ0JBQWdCLEVBQUU7QUFDcEIsQ0FBQztBQUVELGVBQWVkLFNBQVMifQ==