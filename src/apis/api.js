import axios from 'axios'

const api = {
  getGeo: async () => {
    try {
      const response = await axios.get('/geo', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      console.log(response, "response")
      return response.data
    } catch (error) {
      return error
    }
  },

  getOrder: async (q) => {
    try {
      const response = await axios.get(`/order?setNum=${q}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      console.log(response, "response2")
      return response.data; 
    } catch (error) {
      return error
    }
  },
  
  // getSet: {
  //   nextGeoId: 1,
  //   async fetch(geoId, startTime, endTime) {
  //     const start = `${startTime[0]},${startTime[1]},${startTime[2]}`
  //     const end = `${endTime[0]},${endTime[1]},${endTime[2]}`
  //     try {
  //       const response = await axios.get(`/set?geoId=${this.nextGeoId}&startTime=${start}&endTime=${end}`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         withCredentials: true,
  //       })
  //       if (response.status === 200 && response.data.code === 204) {
  //         window.alert("해당 데이터는 존재하지 않습니다.");
  //       }
  //       return response.data
  //     } catch (error) {
  //       return error
  //     }
  //   }
  // },

  getSet: {
    nextGeoId: 1,
    async fetch(geoId, startTime, endTime) {
      const start = `${startTime[1]},${startTime[2]}`
      const end = `${endTime[1]},${endTime[2]}`
      try {
        const response = await axios.get(`/set?geoId=${geoId+1}&startTime=${start}&endTime=${end}`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        if (response.status === 200 && response.data.code === 204) {
          window.alert("해당 데이터는 존재하지 않습니다.");
          // window.alert("종료시간이 시작시간보다 빠를 수 없습니다.");
        }
        else if (response.status === 404){
          window.alert("페이지가 존재하지 않습니다.");
        } else if(response.status === 422){
          window.alert("필요한 정보가 모두 입력되지 않았습니다.");
        }
        // } else if(response.status === 200 && response.data.code === 204 && startTime[1] > endTime[1]){
        //   window.alert("종료시간이 시작시간보다 빠를 수 없습니다.");
        // } else if(startTime[1] === endTime[1]){
        //   window.alert("종료시간이 시작시간과 같을 수 없습니다.");
        // } else if(startTime[2] > endTime[2]){
        //   window.alert("종료시간이 시작시간보다 빠를 수 없습니다.");
        // } else if(startTime[2] === endTime[2]){
        //   window.alert("종료시간이 시작시간과 같을 수 없습니다."); 
        // }
        return response.data
      } 
      catch (error) {
        return error
      }
    }
  },

  postOrder: async ({ setLimit, orderLimit, geoId }) => {
    try {
      const response = await axios.post('/order', {
        setLimit: Number(setLimit),
        orderLimit: Number(orderLimit),
        geoId: geoId
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (response.status === 202) {
        window.alert("현재 다른 알고리즘이 돌아가고 있습니다.")
      } else if (response.status === 404) {
        window.alert("해당 데이터는 존재하지 않습니다.")
      }

      return response.data
    } catch (error) {
      window.alert(`Error: ${error.message}`)
      return error
    }
  },
}

export default api;