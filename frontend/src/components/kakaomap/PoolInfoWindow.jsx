import { useState, useEffect } from 'react';
import TL_SCCO_SIG from './TL_SCCO_SIG.json';

const PoolInfoWindow = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    setJsonData(TL_SCCO_SIG);
  }, []);

  const handleDownload = () => {
    if (!jsonData) return;
    const newJsonData = jsonData.features
      .filter((feature) => feature.properties.SIG_CD.substr(0, 2) === '11')
      .map(({ geometry, properties }) => {
        return {
          SIG_KOR_NM: properties.SIG_KOR_NM,
          coordinates: geometry.coordinates[0],
        };
      });
    setJsonData(newJsonData);
    const blob = new Blob([JSON.stringify(newJsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // 다운로드 링크 생성
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seoul-gu.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>JSON 데이터 다운로드</h2>
      <button onClick={handleDownload} disabled={!jsonData}>
        seoul-gu.json 다운로드
      </button>
    </div>
  );
};

export default PoolInfoWindow;
