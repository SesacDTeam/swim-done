export default function Timetable({ schedule }) {
  if (!schedule || !schedule.length) {
    return (
      <>
    <div className="w-full flex flex-col items-start">
      <div className="text-body01 font-bold">준비된 시간표가 없습니다.</div>
      <hr className="mt-2 w-full border-black" />
    </div>
      </>
    );
  }

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dayKeys = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const thead = (
    <tr className="bg-blue01/70">
      <th className="border p-2">구분</th>
      {days.map((day, index) => (
        <th key={index} className="border p-2">
          {day}
        </th>
      ))}
    </tr>
  );
  const tbody = schedule.map((item, idx) => {
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

  return (
    <div className="overflow-x-auto p-3">
      <table className="table-auto border-collapse border w-full text-center">
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
}
