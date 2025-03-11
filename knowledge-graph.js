// 定義一個存儲原始布局位置的變量
let originalPositions = [];

// 設定自適應尺寸
const containerWidth = document.getElementById('graph').clientWidth || 1000;
const containerHeight = window.innerHeight * 0.7 || 700; // 使用螢幕高度的70%
const width = containerWidth;
const height = containerHeight;

// 初始化工具提示
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// 繪製知識圖譜
function initGraph() {
    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "graph-svg"); // 加入class方便样式調整
        
    // 適應窗口大小變化
    window.addEventListener('resize', function() {
        // 更新圖表尺寸
        const newWidth = document.getElementById('graph').clientWidth || width;
        const newHeight = window.innerHeight * 0.7 || height;
        
        // 更新SVG尺寸
        svg.attr("width", newWidth)
           .attr("height", newHeight)
           .attr("viewBox", [0, 0, newWidth, newHeight]);
        
        // 重置中心力，調整位置
        simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
        simulation.alpha(0.3).restart(); // 重啟模擬但不變換太大
    });

    // 設置節點顏色映射
    const typeColor = {
        "公司": "#4e79a7",
        "IP資產": "#f28e2c",
        "事件": "#e15759",
        "策略": "#76b7b2",
        "市場趨勢": "#59a14f",
        "技術": "#af7aa1"
    };

    // 創建力導向仿真，改進參數使佯網絡更有結構且清晰
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.edges).id(d => d.id).distance(d => {
            // 根據節點類型調整連結線長度
            // 重要的關係以及具有競爵性質的關係顯示得更短一些
            if (d.relation.includes("收購")) return 100;
            if (d.relation.includes("擁有IP")) return 120;
            if (d.relation.includes("競爭")) return 200;
            if (d.relationColor === "#e15759") return 180; // 競爭關係聲色
            // 根據節點類型調整連結線長度
            const sourceType = (typeof d.source === 'object') ? d.source.type : graphData.nodes.find(n => n.id === d.source)?.type;
            const targetType = (typeof d.target === 'object') ? d.target.type : graphData.nodes.find(n => n.id === d.target)?.type;
            
            // 相同類型的節點之間擴展距離
            if (sourceType === targetType) return 180;
            
            return 150;
        }))
        .force("charge", d3.forceManyBody().strength(-700)) // 增強排斥力
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(d => {
            // 根據節點類型調整碰撞半徑
            if (d.type === "公司") return 70;
            if (d.type === "IP資產") return 60;
            return 50;
        }).strength(1)); // 增強碰撞力度防止重疊

    // 先繪製連接線 - 確保線條在最下層
    // 使用不同線條樣式代表不同關係
    const link = svg.append("g")
        .attr("class", "links-group")
        .selectAll("line")
        .data(graphData.edges)
        .join("line")
        .attr("stroke", d => d.relationColor || "#999")
        .attr("stroke-opacity", 1) // 設為完全不透明以增強可見度
        .attr("stroke-width", d => {
            // 依關係類型設定不同寬度
            if (d.relation.includes("收購")) return 4;
            if (d.relation.includes("擁有IP")) return 3;
            if (d.relation.includes("競爭")) return 3.5;
            if (d.relationColor === "#e15759") return 3.5; // 競爭關係聲色
            return 2.5;
        })
        .attr("stroke-dasharray", d => {
            // 依關係類型設定不同線條樣式
            if (d.relation.includes("收購")) return "none"; // 實線
            if (d.relation.includes("競爭")) return "5,3"; // 虛線
            if (d.relation.includes("提供")) return "3,3"; // 虛線
            if (d.relation.includes("合作")) return "8,4"; // 長虛線
            if (d.relation.includes("擁有")) return "none"; // 實線
            if (d.relation.includes("影響")) return "5,2,2,2"; // 點線
            return "none"; // 預設實線
        });

    // 繪製連接線文字
    const linkText = svg.append("g")
        .attr("class", "link-text-group")
        .selectAll("text")
        .data(graphData.edges)
        .join("text")
        .attr("font-size", "11px")
        .attr("fill", "#333")
        .attr("font-weight", "bold") // 粗體使文字更明顯
        .text(d => d.relation);

    // 確保所有文字都有描邊使其更易讀且不干擾線條
    linkText.attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 0.8)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("paint-order", "stroke");

    // 節點組
    const node = svg.append("g")
        .selectAll(".node")
        .data(graphData.nodes)
        .join("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", function(event, d) {
            let html = `<strong>${d.name}</strong><br>`;
            html += `<strong>類型：</strong>${d.type}<br>`;
            html += `<strong>描述：</strong>${d.description}<br>`;
            
            if (d.time) {
                html += `<strong>時間：</strong>${d.time}<br>`;
            }
            
            html += `<strong>屬性：</strong><br>`;
            for (const [key, value] of Object.entries(d.properties)) {
                html += `- ${key}: ${value}<br>`;
            }
            
            tooltip.html(html)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .style("opacity", 0.95);
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });

    // 節點圓形，改進大小和樣式，增加視覺對比
    node.append("circle")
        .attr("r", d => {
            // 根據不同節點類型調整大小，使區別更明顯
            if (d.type === "公司") {
                // 特別區分主要公司和其他公司
                if (d.id === "disney" || d.id === "netflix") return 40;
                return 32;
            }
            if (d.type === "IP資產") return 28;
            if (d.type === "技術") return 26;
            if (d.type === "市場趨勢") return 26;
            if (d.type === "策略") return 24;
            if (d.type === "事件") {
                // 判斷重要事件
                if (d.id.includes("acquisition") || d.id.includes("轉型")) return 26;
                return 22;
            }
            return 24;
        })
        .attr("fill", d => {
            // 調整填充顏色的透明度來降低視覺負擔
            const baseColor = typeColor[d.type] || "#999";
            // 主要節點顏色更飽和
            if (d.id === "disney" || d.id === "netflix") {
                return baseColor;
            }
            // 其他節點的顏色調低一點亮度，減低視覺負擔
            return d3.color(baseColor).brighter(0.3);
        })
        .attr("stroke", d => {
            // 為重要節點增加特殊描邊樣式
            if (d.id === "disney" || d.id === "netflix") return "#333";
            if (d.id.includes("disney_mcu") || d.id.includes("disney_star_wars")) return "#f0f0f0";
            return "#fff";
        })
        .attr("stroke-width", d => {
            // 重要節點描邊更粗，增強視覺對比
            if (d.id === "disney" || d.id === "netflix") return 3;
            if (d.type === "IP資產") return 2;
            return 1.5; // 其他節點的描邊更細，減低視覺負擔
        })
        .attr("stroke-opacity", d => {
            // 只有重要節點有更高的描邊不透明度
            if (d.id === "disney" || d.id === "netflix") return 0.9;
            return 0.7;
        });

    // 節點文字優化
    // 不再使用背景矩形，而是直接對文字本身進行優化
    node.append("text")
        .text(d => d.name.length > 10 ? d.name.substring(0, 10) + "..." : d.name)
        .attr("dy", d => d.type === "公司" ? 55 : 45) // 增加標籤與節點的間距
        .attr("text-anchor", "middle")
        .attr("font-size", d => d.type === "公司" ? "14px" : "12px") // 公司名稱字體較大
        .attr("font-weight", d => d.type === "公司" ? "bold" : "normal")
        .attr("fill", d => {
            // 使用深色文字增強對比度
            if (d.type === "公司") return "#333";
            return "#333"; // 統一使用深色文字
        })
        .attr("stroke", "white") // 添加白色描邊增強可讀性
        .attr("stroke-width", "2px") // 增加描邊寬度以更好地處理文字重疊
        .attr("stroke-opacity", 0.9) // 增強描邊的可見度
        .attr("paint-order", "stroke")
        .attr("pointer-events", "none"); // 避免文字會屏蔽點擊事件

    // 更新位置函數
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        linkText
            .attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .each(function() {
                // 移除所有背景皎形，完全依賴文字描邊提高可讀性
                // 在直接設置文字參數的方式增強描邊
                d3.select(this)
                    .attr("stroke", "white")
                    .attr("stroke-width", 3)
                    .attr("stroke-opacity", 0.9)
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .attr("paint-order", "stroke");
            });

        node.attr("transform", d => `translate(${d.x}, ${d.y})`);
    });

    // 設置初始位置並存儲起來
    graphData.nodes.forEach(node => {
        let initialX, initialY;
        
        if (node.id === "disney") {
            initialX = width / 3;
            initialY = height / 3;
            node.fx = initialX;
            node.fy = initialY;
        } else if (node.id === "netflix") {
            initialX = 2 * width / 3;
            initialY = height / 3;
            node.fx = initialX;
            node.fy = initialY;
        } else if (node.type === "公司") {
            // 其他公司節點
            initialX = Math.random() * width;
            initialY = Math.random() * height / 2;
            node.x = initialX;
            node.y = initialY;
        } else if (node.type === "IP資產") {
            // IP資產節點
            initialX = Math.random() * width;
            initialY = height / 2 + Math.random() * height / 4;
            node.x = initialX;
            node.y = initialY;
        } else {
            // 其他節點
            initialX = Math.random() * width;
            initialY = Math.random() * height;
            node.x = initialX;
            node.y = initialY;
        }
        
        // 存儲初始位置
        originalPositions.push({
            id: node.id,
            x: initialX,
            y: initialY,
            fx: node.id === "disney" || node.id === "netflix" ? initialX : null,
            fy: node.id === "disney" || node.id === "netflix" ? initialY : null
        });
    });

    // 重啟模擬
    simulation.alpha(1).restart();

    // 拖拽函數
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        // 公司節點保持固定
        if (d.type !== "公司") {
            d.fx = null;
            d.fy = null;
        }
    }

    // 篩選功能
    d3.selectAll(".filter-btn").on("click", function() {
        const filter = d3.select(this).attr("data-filter");
        d3.selectAll(".filter-btn").classed("active", false);
        d3.select(this).classed("active", true);
        
        // 根據篩選條件顯示/隱藏節點
        if (filter === "all") {
            node.style("display", "block");
            
            // 恢復所有線條的原始樣式
            link.style("display", "block")
                .attr("stroke-width", d => {
                    // 依關係類型設定不同寬度
                    if (d.relation.includes("收購")) return 4;
                    if (d.relation.includes("擁有IP")) return 3;
                    if (d.relation.includes("競爭")) return 3.5;
                    if (d.relationColor === "#e15759") return 3.5; // 競爭關係顏色
                    return 2.5;
                })
                .attr("stroke-dasharray", d => {
                    // 依關係類型設定不同線條樣式
                    if (d.relation.includes("收購")) return "none"; // 實線
                    if (d.relation.includes("競爭")) return "5,3"; // 虛線
                    if (d.relation.includes("提供")) return "3,3"; // 虛線
                    if (d.relation.includes("合作")) return "8,4"; // 長虛線
                    if (d.relation.includes("擁有")) return "none"; // 實線
                    if (d.relation.includes("影響")) return "5,2,2,2"; // 點線
                    return "none"; // 預設實線
                });
                
            linkText.style("display", "block");
        } else if (filter === "競爭") {
            // 顯示與競爭有關的節點
            const competitionEdges = graphData.edges.filter(d => 
                d.relation.includes("競爭") || d.relationColor === "#e15759"
            );
            const competitionNodeIds = new Set();
            competitionEdges.forEach(d => {
                competitionNodeIds.add(d.source.id || d.source);
                competitionNodeIds.add(d.target.id || d.target);
            });
            
            node.style("display", d => competitionNodeIds.has(d.id) ? "block" : "none");
            
            // 增強競爭關係線條的視覺效果
            link.each(function(d) {
            const isCompetitionEdge = d.relation.includes("競爭") || d.relationColor === "#e15759";
            d3.select(this)
            .style("display", isCompetitionEdge ? "block" : "none")
            .attr("stroke-width", isCompetitionEdge ? 5 : 3)
                  .attr("stroke-dasharray", isCompetitionEdge ? "5,3" : "none"); // 競爭關系用虛線
            });
            
            linkText.style("display", d => d.relation.includes("競爭") || d.relationColor === "#e15759" ? "block" : "none");
        } else {
            // 按節點類型篩選
            node.style("display", d => d.type === filter ? "block" : "none");
            
            // 獲取顯示節點的ID
            const visibleNodeIds = new Set();
            node.each(function(d) {
                if (d3.select(this).style("display") !== "none") {
                    visibleNodeIds.add(d.id);
                }
            });
            
            // 只顯示連接顯示節點的邊 並增強選中的線條效果
            link.each(function(d) {
                const sourceId = d.source.id || d.source;
                const targetId = d.target.id || d.target;
                const isVisible = visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
                
                d3.select(this)
                  .style("display", isVisible ? "block" : "none")
                  .attr("stroke-width", isVisible ? 4 : 3) // 線條粗一點來強調當前節點間的關系
                  .attr("stroke-opacity", 1)
                  // 保持線條類型的區別，因為線條樣式會表達不同關係
            });
            
            linkText.each(function(d) {
                const sourceId = d.source.id || d.source;
                const targetId = d.target.id || d.target;
                const isVisible = visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
                
                d3.select(this)
                  .style("display", isVisible ? "block" : "none");
            });
        }
    });

    // 重置按鈕功能
    d3.select("#reset-graph").on("click", function() {
        // 將每個節點恢復到原始位置
        graphData.nodes.forEach(node => {
            const originalPos = originalPositions.find(pos => pos.id === node.id);
            if (originalPos) {
                node.x = originalPos.x;
                node.y = originalPos.y;
                node.fx = originalPos.fx;
                node.fy = originalPos.fy;
            }
        });
        
        // 重組仿真
        simulation.alpha(1).restart();
        
        // 重置過濟器
        d3.selectAll(".filter-btn").classed("active", false);
        d3.select(".filter-btn[data-filter='all']").classed("active", true);
        
        // 顯示所有節點和邊，恢復原始線條樣式
        node.style("display", "block");
        
        // 恢復所有線條的原始樣式
        link.style("display", "block")
            .attr("stroke-width", d => {
                // 依關係類型設定不同寬度
                if (d.relation.includes("收購")) return 4;
                if (d.relation.includes("擁有IP")) return 3;
                if (d.relation.includes("競爭")) return 3.5;
                if (d.relationColor === "#e15759") return 3.5; // 競爭關係顏色
                return 2.5;
            })
            .attr("stroke-dasharray", d => {
                // 依關係類型設定不同線條樣式
                if (d.relation.includes("收購")) return "none"; // 實線
                if (d.relation.includes("競爭")) return "5,3"; // 虛線
                if (d.relation.includes("提供")) return "3,3"; // 虛線
                if (d.relation.includes("合作")) return "8,4"; // 長虛線
                if (d.relation.includes("擁有")) return "none"; // 實線
                if (d.relation.includes("影響")) return "5,2,2,2"; // 點線
                return "none"; // 預設實線
            });
            
        linkText.style("display", "block");
    });
}

// 初始化時間線
function initTimeline() {
    // 完全重設時間軸的文字排列
    // 使用喚着的上下交錯方式

    const timelineSvg = d3.select("#timeline");
    
    // 按年份排序
    timelineData.sort((a, b) => {
        // 提取年份並轉換為數字
        const yearA = parseInt(a.year.match(/\d+/)[0]);
        const yearB = parseInt(b.year.match(/\d+/)[0]);
        return yearA - yearB;
    });
    
    const timelineWidth = document.getElementById('timeline').clientWidth || 1000;
    const timeScale = d3.scalePoint()
        .domain(timelineData.map(d => d.year))
        .range([50, timelineWidth - 50]) // 動態調整時間軸寬度
        .padding(0.5);

    // 時間線軸 - 下移到 70 使文字有更多空間
    timelineSvg.append("line")
        .attr("x1", 50)
        .attr("x2", timelineWidth - 50) // 與時間軸寬度一致
        .attr("y1", 70)
        .attr("y2", 70)
        .attr("stroke", "#999")
        .attr("stroke-width", 2);

    // 時間點 - 跟隊時間軸一起下移到 70
    const timePoints = timelineSvg.selectAll(".time-point")
        .data(timelineData)
        .join("g")
        .attr("class", "time-point")
        .attr("transform", d => `translate(${timeScale(d.year)}, 70)`);

    // 為時間點添加交替顏色以區分迪士尼和Netflix事件
    timePoints.append("circle")
        .attr("r", 5)
        .attr("fill", d => {
            if (d.event.includes("迪士尼") || d.event.includes("Disney")) {
                return "#4e79a7"; // 迪士尼藍色
            } else if (d.event.includes("Netflix")) {
                return "#e15759"; // Netflix紅色
            } else {
                return "#555"; // 其他事件灰色
            }
        });

    timePoints.append("text")
        .attr("y", -25) // 再次增加距離以確保時間軸文字與時間線充分分開
        .attr("transform", "rotate(-35)")
        .text(d => d.year)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("fill", "#333")
        .attr("font-weight", "bold");
    
    // 事件文字染為两組上下交錯排列
    timePoints.append("text")
    .attr("y", (d, i) => {
        const rowHeight = 25; // 增加間距，確保不重疊
        return (i % 4) * rowHeight + 20; // 增加與時間線的間距，從10改為20
    })
        .text(d => d.event)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", d => {
            if (d.event.includes("迪士尼") || d.event.includes("Disney")) {
                return "#4e79a7"; // 迪士尼藍色
            } else if (d.event.includes("Netflix")) {
                return "#e15759"; // Netflix紅色
            } else {
                return "#555"; // 其他事件灰色
            }
        });

    // 不再為時間軸文字增加背景
}

// 頁面載入完成後初始化圖表
document.addEventListener('DOMContentLoaded', function() {
    // 確保必要的數據已經存在
    if (typeof graphNodes === 'undefined' || typeof graphEdges === 'undefined') {
        console.error('圖表數據未正確載入。');
        document.getElementById('graph').innerHTML = '載入圖表時出錯，請確保所有必要的JS檔案已正確載入。';
        return;
    }

    // 確保 graphData 物件存在
    if (typeof graphData !== 'object' || !graphData.nodes || !graphData.edges) {
        console.error('graphData 對象未正確定義。');
        graphData = {
            nodes: graphNodes,
            edges: graphEdges
        };
    }

    try {
        initGraph();
        initTimeline();
    } catch (error) {
        console.error('初始化圖表時發生錯誤:', error);
        document.getElementById('graph').innerHTML = `載入圖表時發生錯誤: ${error.message}`;
    }
});