import { selector } from "recoil";
import { userAtom, deviceAtom, autoConfigAtom, sensorAtom, actuatorAtom } from "@store/atoms";
import { maxBy, meanBy } from "lodash";
import device000sensor from "@data/user000/sensorLog";
import device000actuator from "@data/user000/actuatorLog";

const JSONdevice000sensor = JSON.parse(JSON.stringify(device000sensor));
const JSONdevice000actuator = JSON.parse(JSON.stringify(device000actuator));

// [셀렉터:필터] 누적센서데이터 중 최신 데이터
export const latestSensorSelector = selector({
  key: "latestSensorSelector",
  get: ({ get }) => {
    let origin = get(sensorAtom) || JSONdevice000sensor;
    return maxBy(origin, (data) => new Date(data.created_at).getTime());
    //return [];
  },
});

//[셀렉터:포맷] 누적센서데이터의 created_at을 DATE와 TIME으로 분리하여 저장
export const formatSensorSelector = selector({
  key: "formatSensorSelector",
  get: ({ get }) => {
    let origin = get(sensorAtom) || JSONdevice000sensor;

    const data = origin.map((item) => {
      const unixTimeMS = item.created_at < 10000000000 ? item.created_at * 1000 : item.created_at;

      const unixTimeDate = new Date(unixTimeMS); //date 타입으로 저장

      //YYYY/MM/DD 스트링으로 저장
      const yyyy = unixTimeDate.getFullYear();
      const mm = String(unixTimeDate.getMonth() + 1).padStart(2, "0");
      const dd = String(unixTimeDate.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}/${mm}/${dd}`;

      //HH:mm:ss 스트링으로 저장
      const hh = String(unixTimeDate.getHours()).padStart(2, "0");
      const min = String(unixTimeDate.getMinutes()).padStart(2, "0");
      const sec = String(unixTimeDate.getSeconds()).padStart(2, "0");
      const formattedTime = `${hh}:${min}:${sec}`;

      const newItem = {
        ...item,
        created_at: unixTimeDate,
        date: formattedDate,
        time: formattedTime,
      };

      return newItem;
    });
    return data;
  },
});

// [셀렉터:계산] 하루 평균 센서데이터를 저장한 배열
export const dailyAverageSensorSelector = selector({
  key: "dailyAverageSensorSelector",
  get: ({ get }) => {
    const origin = get(formatSensorSelector) || JSONdevice000sensor;

    const calSum = origin.reduce((acc, cur) => {
      if (acc.length === 0 || acc[acc.length - 1].date !== cur.date) {
        acc.push({
          date: cur.date,
          count: 0,
          sumLight: 0,
          sumMoisture: 0,
          sumTemp: 0,
          sumHumidity: 0,
        });
      }
      acc[acc.length - 1].sumLight += cur.light;
      acc[acc.length - 1].sumMoisture += cur.moisture;
      acc[acc.length - 1].sumTemp += cur.temp;
      acc[acc.length - 1].sumHumidity += cur.humidity;
      acc[acc.length - 1].count++;

      return acc;
    }, []);

    //최대값 기준과 백분율 반영
    const MAXLUX = 150;
    const MAXMOIST = 23;

    const calAvg = calSum.map((item) => {
      const lightAvg = Math.floor(item.sumLight / item.count / MAXLUX);
      const moistureAvg = Math.floor(item.sumMoisture / item.count / MAXMOIST);
      const tempAvg = Math.floor(item.sumTemp / item.count);
      const humidityAvg = Math.floor(item.sumHumidity / item.count);
      return { light: lightAvg, moisture: moistureAvg, temp: tempAvg, humidity: humidityAvg };
    });

    return calAvg;
  },
});
// [셀렉터:계산] 일별 평균 센서값 배열의 최소, 최대값 계산
export const dailyAverageMaxMinSelector = selector({
  key: "dailyAverageMaxMinSelector",
  get: ({ get }) => {
    const origin = get(dailyAverageSensorSelector) || JSONdevice000sensor;

    const res = origin.reduce(
      (acc, cur) => {
        if (cur.temp !== 0) {
          acc.temp.max = Math.max(acc.temp.max, cur.temp);
          acc.temp.min = Math.min(acc.temp.min, cur.temp);
        }
        if (cur.humidity !== 0) {
          acc.humidity.max = Math.max(acc.humidity.max, cur.humidity);
          acc.humidity.min = Math.min(acc.humidity.min, cur.humidity);
        }
        if (cur.light !== 0) {
          acc.light.max = Math.max(acc.light.max, cur.light);
          acc.light.min = Math.min(acc.light.min, cur.light);
        }
        if (cur.moisture !== 0) {
          acc.moisture.max = Math.max(acc.moisture.max, cur.moisture);
          acc.moisture.min = Math.min(acc.moisture.min, cur.moisture);
        }
        return acc;
      },
      {
        temp: { max: 0, min: Infinity },
        humidity: { max: 0, min: Infinity },
        light: { max: 0, min: Infinity },
        moisture: { max: 0, min: Infinity },
      }
    );

    return res;
  },
});

// [셀렉터:포맷] 자동제어상태 배열->단일객체, unixTime->string
export const formatAutoConfigSelector = selector({
  key: "formatAutoConfigSelector",
  get: ({ get }) => {
    const origin = get(autoConfigAtom);

    const date = origin.created_at || "2023-01-01 01:01:01";
    /*
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const hours = date.slice(11, 13);
    const minutes = date.slice(14, 16);
    const seconds = date.slice(17, 19);

    const dateString = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
*/
    const dateString = "2023-01-01 01:01:01";
    const newObject = { ...origin, created_at: dateString };

    return newObject;
  },
});

// [셀렉터:포맷] 누적 액츄에이터 로그 unixtime*1000
export const formatActuatorSelector = selector({
  key: "formatActuatorSelector",
  get: ({ get }) => {
    const origin = get(actuatorAtom);

    const newLog = origin.map((item) => {
      return {
        ...item,
        created_at: item.created_at < 10000000000 ? item.created_at * 1000 : item.created_at,
      };
    });

    return newLog;
  },
});

export const dayAndNightSelector = selector({
  key: "dayAndNightSelector",
  get: ({ get }) => {
    const origin = get(formatSensorSelector);

    const calArr = origin.reduce((acc, cur) => {
      if (acc.length === 0 || acc[acc.length - 1].date !== cur.date) {
        acc.push({
          date: cur.date,
          day: [],
          night: [],
        });
      }

      const hour = parseInt(cur.time.substr(0, 2));

      if (hour >= 6 && hour <= 18) {
        acc[acc.length - 1].day.push(cur);
      } else {
        acc[acc.length - 1].night.push(cur);
      }

      return acc;
    }, []);

    const newArr = calArr.map((item) => {
      const dayAvg = {
        temp: meanBy(item.day, "temp").toFixed(1),
        light: meanBy(item.day, "light").toFixed(0),
        moisture: meanBy(item.day, "moisture").toFixed(0),
        humidity: meanBy(item.day, "humidity").toFixed(0),
      };
      const nightAvg = {
        temp: meanBy(item.night, "temp").toFixed(1),
        light: meanBy(item.night, "light").toFixed(0),
        moisture: meanBy(item.night, "moisture").toFixed(0),
        humidity: meanBy(item.night, "humidity").toFixed(0),
      };

      const res = { ...item, dayAvg: dayAvg, nightAvg: nightAvg };
      return res;
    });

    return newArr;
  },
});
// [셀렉터] 온도에 관한 모든 데이터
/*export const temperatureAtom = selector({
  key: "temperatureAtom",
  get: ({ get }) => {
    const sensorData = get(sensorDataAtom); //배열객체 -api연결완료
    const autoControlConfig = get(autoControlConfigAtom); //단일객체
    const actuatorLog = get(actuatorLogAtom); //배열객체

    const latestTemp = sensorData[sensorData.length - 1].temp; //최신온도값(단일)
    const isAutoControl = autoControlConfig.status; //autoControlConfig가 배열이라면 수정필요(현재 단일객체에서 뽑은 단일값)

    let isAutoTemp = false;
    let autoStartAt = 0;
    //온도에 대한 자동제어가 진행중인지, 진행중이라면 언제부터 진행중인지 저장(단일)
    if (isAutoControl && autoControlConfig.target_temp) {
      isAutoTemp = true;
      autoStartAt = autoControlConfig.created_at;
    } else {
      isAutoTemp = false;
      autoStartAt = 0;
    }
    //액츄에이터가 작동된 로그 중에 FAN을 작동한(나중에 펠티어로 교체...)로그만 필터링한 새로운 (배열)
    const tempLog = actuatorLog.filter((obj) => obj.fan > 0);

    const res = {
      latestTemp: latestTemp,
      isAutoControl: isAutoControl,
      isAutoTemp: isAutoTemp,
      autoStartAt: autoStartAt,
      log: tempLog,
    };
    return res;
  },
});
*/
