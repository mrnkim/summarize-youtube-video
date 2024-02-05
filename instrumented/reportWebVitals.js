function cov_ho3gd177o() {
  var path = "/Users/Miranda/twelveLabs/Get-Inspiration-V2/src/reportWebVitals.js";
  var hash = "2a337fde5082f900695bcb470e8b0cd583ba4e02";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/Miranda/twelveLabs/Get-Inspiration-V2/src/reportWebVitals.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 24
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "1": {
        start: {
          line: 2,
          column: 2
        },
        end: {
          line: 10,
          column: 3
        }
      },
      "2": {
        start: {
          line: 3,
          column: 4
        },
        end: {
          line: 9,
          column: 7
        }
      },
      "3": {
        start: {
          line: 4,
          column: 6
        },
        end: {
          line: 4,
          column: 26
        }
      },
      "4": {
        start: {
          line: 5,
          column: 6
        },
        end: {
          line: 5,
          column: 26
        }
      },
      "5": {
        start: {
          line: 6,
          column: 6
        },
        end: {
          line: 6,
          column: 26
        }
      },
      "6": {
        start: {
          line: 7,
          column: 6
        },
        end: {
          line: 7,
          column: 26
        }
      },
      "7": {
        start: {
          line: 8,
          column: 6
        },
        end: {
          line: 8,
          column: 27
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 24
          },
          end: {
            line: 1,
            column: 25
          }
        },
        loc: {
          start: {
            line: 1,
            column: 39
          },
          end: {
            line: 11,
            column: 1
          }
        },
        line: 1
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 3,
            column: 30
          },
          end: {
            line: 3,
            column: 31
          }
        },
        loc: {
          start: {
            line: 3,
            column: 79
          },
          end: {
            line: 9,
            column: 5
          }
        },
        line: 3
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 10,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 10,
            column: 3
          }
        }, {
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 10,
            column: 3
          }
        }],
        line: 2
      },
      "1": {
        loc: {
          start: {
            line: 2,
            column: 6
          },
          end: {
            line: 2,
            column: 52
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 2,
            column: 6
          },
          end: {
            line: 2,
            column: 17
          }
        }, {
          start: {
            line: 2,
            column: 21
          },
          end: {
            line: 2,
            column: 52
          }
        }],
        line: 2
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "2a337fde5082f900695bcb470e8b0cd583ba4e02"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_ho3gd177o = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_ho3gd177o();
cov_ho3gd177o().s[0]++;
const reportWebVitals = onPerfEntry => {
  cov_ho3gd177o().f[0]++;
  cov_ho3gd177o().s[1]++;
  if ((cov_ho3gd177o().b[1][0]++, onPerfEntry) && (cov_ho3gd177o().b[1][1]++, onPerfEntry instanceof Function)) {
    cov_ho3gd177o().b[0][0]++;
    cov_ho3gd177o().s[2]++;
    import('web-vitals').then(({
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB
    }) => {
      cov_ho3gd177o().f[1]++;
      cov_ho3gd177o().s[3]++;
      getCLS(onPerfEntry);
      cov_ho3gd177o().s[4]++;
      getFID(onPerfEntry);
      cov_ho3gd177o().s[5]++;
      getFCP(onPerfEntry);
      cov_ho3gd177o().s[6]++;
      getLCP(onPerfEntry);
      cov_ho3gd177o().s[7]++;
      getTTFB(onPerfEntry);
    });
  } else {
    cov_ho3gd177o().b[0][1]++;
  }
};
export default reportWebVitals;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfaG8zZ2QxNzdvIiwiYWN0dWFsQ292ZXJhZ2UiLCJzIiwicmVwb3J0V2ViVml0YWxzIiwib25QZXJmRW50cnkiLCJmIiwiYiIsIkZ1bmN0aW9uIiwidGhlbiIsImdldENMUyIsImdldEZJRCIsImdldEZDUCIsImdldExDUCIsImdldFRURkIiXSwic291cmNlcyI6WyJyZXBvcnRXZWJWaXRhbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVwb3J0V2ViVml0YWxzID0gb25QZXJmRW50cnkgPT4ge1xuICBpZiAob25QZXJmRW50cnkgJiYgb25QZXJmRW50cnkgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIGltcG9ydCgnd2ViLXZpdGFscycpLnRoZW4oKHsgZ2V0Q0xTLCBnZXRGSUQsIGdldEZDUCwgZ2V0TENQLCBnZXRUVEZCIH0pID0+IHtcbiAgICAgIGdldENMUyhvblBlcmZFbnRyeSk7XG4gICAgICBnZXRGSUQob25QZXJmRW50cnkpO1xuICAgICAgZ2V0RkNQKG9uUGVyZkVudHJ5KTtcbiAgICAgIGdldExDUChvblBlcmZFbnRyeSk7XG4gICAgICBnZXRUVEZCKG9uUGVyZkVudHJ5KTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwb3J0V2ViVml0YWxzO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxhQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxhQUFBO0FBQUFBLGFBQUEsR0FBQUUsQ0FBQTtBQWZaLE1BQU1DLGVBQWUsR0FBR0MsV0FBVyxJQUFJO0VBQUFKLGFBQUEsR0FBQUssQ0FBQTtFQUFBTCxhQUFBLEdBQUFFLENBQUE7RUFDckMsSUFBSSxDQUFBRixhQUFBLEdBQUFNLENBQUEsVUFBQUYsV0FBVyxNQUFBSixhQUFBLEdBQUFNLENBQUEsVUFBSUYsV0FBVyxZQUFZRyxRQUFRLEdBQUU7SUFBQVAsYUFBQSxHQUFBTSxDQUFBO0lBQUFOLGFBQUEsR0FBQUUsQ0FBQTtJQUNsRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUNNLElBQUksQ0FBQyxDQUFDO01BQUVDLE1BQU07TUFBRUMsTUFBTTtNQUFFQyxNQUFNO01BQUVDLE1BQU07TUFBRUM7SUFBUSxDQUFDLEtBQUs7TUFBQWIsYUFBQSxHQUFBSyxDQUFBO01BQUFMLGFBQUEsR0FBQUUsQ0FBQTtNQUN6RU8sTUFBTSxDQUFDTCxXQUFXLENBQUM7TUFBQ0osYUFBQSxHQUFBRSxDQUFBO01BQ3BCUSxNQUFNLENBQUNOLFdBQVcsQ0FBQztNQUFDSixhQUFBLEdBQUFFLENBQUE7TUFDcEJTLE1BQU0sQ0FBQ1AsV0FBVyxDQUFDO01BQUNKLGFBQUEsR0FBQUUsQ0FBQTtNQUNwQlUsTUFBTSxDQUFDUixXQUFXLENBQUM7TUFBQ0osYUFBQSxHQUFBRSxDQUFBO01BQ3BCVyxPQUFPLENBQUNULFdBQVcsQ0FBQztJQUN0QixDQUFDLENBQUM7RUFDSixDQUFDO0lBQUFKLGFBQUEsR0FBQU0sQ0FBQTtFQUFBO0FBQ0gsQ0FBQztBQUVELGVBQWVILGVBQWUifQ==