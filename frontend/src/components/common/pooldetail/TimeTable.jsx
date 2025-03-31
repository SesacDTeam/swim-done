export default function Timetable({ schedule }) {
  console.log('schedule', schedule); // schedule 데이터 확인

  if (!schedule || !schedule.length) {
    // if (!schedule || !Object.values(schedule).length) {
    return (
      <>
        <div className="text-body01 font-bold">준비된 시간표가 없습니다</div>
        <hr className="m-2" />
      </>
    );
  }

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dayKeys = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const baseTimes = []; // 06:00 ~ 21:00
  for (let i = 6; i < 22; i++) {
    baseTimes.push({ [`${String(i).padStart(2, '0')}:00`]: null });
  }

  baseTimes.forEach((baseTime, idx) => {
    const time = Object.keys(baseTime)[0];
    const scheduleItem = schedule.find((item) => item.startTime === time);
    if (scheduleItem) {
      baseTimes[idx] = { [time]: scheduleItem.days };
    } else {
      baseTimes[idx] = { [time]: {} };
    }
  });

  const ver1_result = baseTimes.map((item) =>
    Object.entries(item).map(([baseTime, days], idx) => (
      <tr key={idx} className="even:bg-gray01/50">
        <td className="border p-1">
          {baseTime} ~ {baseTime.replace('00', '50')}
        </td>
        {dayKeys.map((day, index) => (
          <td key={index} className={`border p-1 ${days[day] ? 'bg-blue01/15' : ''}`}>
            {days[day] || ''}
          </td>
        ))}
      </tr>
    )),
  );
  const ver2_result = schedule.map((item, idx) => {
    return (
      <tr key={idx} className="even:bg-gray01/50">
        <td className="border p-1">
          {item.startTime} ~ {item.endTime}
        </td>
        {dayKeys.map((day, index) => (
          <td key={index} className={`border p-1 ${item.days[day] ? 'bg-blue01/15' : ''}`}>
            {item.days[day] || ''}
          </td>
        ))}
      </tr>
    );
  });

  // const ver3_result = (
  //   <div>
  //     {dayKeys.map((day, index) => (
  //       <div key={index} className={`p-1`}>
  //         {schedule.days[day]?.length ? (
  //           <>
  //             <div key={index}>{day}</div>
  //             <div>
  //               {schedule.days[day].map(({ startTime, endTime }, idx) => {
  //                 return (
  //                   <>
  //                     <span key={idx}>
  //                       {startTime} ~ {endTime}
  //                       {schedule.days[day].length - 1 == idx ? (
  //                         ''
  //                       ) : (
  //                         <span key={`span-${idx}`} className="m-2">
  //                           {''}
  //                         </span>
  //                       )}
  //                     </span>
  //                     {!((idx + 1) % 5) ? <br /> : ''}
  //                   </>
  //                 );
  //               })}
  //             </div>
  //           </>
  //         ) : (
  //           ''
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="overflow-x-auto p-3">
      {/* <div>{ver3_result}</div> */}
      <table className="table-auto border-collapse border w-full text-center">
        <thead>
          <tr className="bg-blue01/70">
            <th className="border p-2">구분</th>
            {days.map((day, index) => (
              <th key={index} className="border p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{ver2_result}</tbody>
      </table>
    </div>
  );
}
