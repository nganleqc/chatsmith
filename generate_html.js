const fs = require('fs');
const path = require('path');

// Đọc file JSON data
const dataPath = './data_output.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function generateHTML() {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.project_info.name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .tabs {
            display: flex;
            flex-wrap: wrap;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
            margin-bottom: 20px;
        }
        
        .tab-button {
            flex: 1;
            min-width: 150px;
            padding: 15px 20px;
            background: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
        }
        
        .tab-button:hover {
            background: #f8f9ff;
            color: #667eea;
        }
        
        .tab-button.active {
            background: #667eea;
            color: white;
            border-bottom-color: #5a67d8;
        }
        
        .tab-content {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 30px;
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .feature-header {
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .feature-title {
            font-size: 1.8em;
            color: #2d3748;
            margin-bottom: 8px;
        }
        
        .feature-description {
            color: #718096;
            font-size: 1.1em;
        }
        
        .test-case {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        
        .test-case:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        
        .test-case-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .test-id {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .test-category {
            background: #48bb78;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-left: 10px;
        }
        
        .priority {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-left: auto;
        }
        
        .priority.high { background: #fed7d7; color: #c53030; }
        .priority.medium { background: #feebc8; color: #dd6b20; }
        .priority.low { background: #c6f6d5; color: #38a169; }
        
        .test-content {
            line-height: 1.6;
        }
        
        .test-field {
            margin-bottom: 12px;
        }
        
        .field-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 4px;
        }
        
        .field-value {
            background: white;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }
        
        .tags {
            margin-top: 15px;
        }
        
        .tag {
            display: inline-block;
            background: #bee3f8;
            color: #2b6cb0;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            margin-right: 6px;
            margin-bottom: 4px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .stat-label {
            color: #718096;
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .tabs {
                flex-direction: column;
            }
            
            .tab-button {
                min-width: auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.project_info.name}</h1>
            <p>${data.project_info.description}</p>
            <small>Last updated: ${data.project_info.last_updated} | Version: ${data.project_info.version}</small>
        </div>
        
        ${generateStats()}
        
        <div class="tabs">
            ${generateTabButtons()}
        </div>
        
        ${generateTabContents()}
    </div>
    
    <script>
        // Tab switching functionality
        function switchTab(featureKey) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(featureKey).classList.add('active');
            document.querySelector(\`[onclick="switchTab('\${featureKey}')"]\`).classList.add('active');
        }
        
        // Initialize first tab as active
        document.addEventListener('DOMContentLoaded', function() {
            const firstTab = document.querySelector('.tab-button');
            if (firstTab) {
                firstTab.click();
            }
        });
    </script>
</body>
</html>`;
}

function generateStats() {
    const features = Object.keys(data.features);
    const totalTestCases = features.reduce((total, key) => {
        return total + (data.features[key].test_cases?.length || 0);
    }, 0);
    
    const highPriorityTests = features.reduce((total, key) => {
        const cases = data.features[key].test_cases || [];
        return total + cases.filter(test => test.priority === 'high').length;
    }, 0);
    
    return `
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${features.length}</div>
                <div class="stat-label">Features</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${totalTestCases}</div>
                <div class="stat-label">Total Test Cases</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${highPriorityTests}</div>
                <div class="stat-label">High Priority Tests</div>
            </div>
        </div>
    `;
}

function generateTabButtons() {
    return Object.keys(data.features).map(key => {
        const feature = data.features[key];
        return `<button class="tab-button" onclick="switchTab('${key}')">${feature.name}</button>`;
    }).join('');
}

function generateTabContents() {
    return Object.keys(data.features).map(key => {
        const feature = data.features[key];
        return `
            <div id="${key}" class="tab-content">
                <div class="feature-header">
                    <h2 class="feature-title">${feature.name}</h2>
                    <p class="feature-description">${feature.description}</p>
                </div>
                ${generateTestCases(feature.test_cases || [])}
            </div>
        `;
    }).join('');
}

function generateTestCases(testCases) {
    if (!testCases.length) {
        return '<p style="text-align: center; color: #718096; font-style: italic;">No test cases available</p>';
    }
    
    return testCases.map(testCase => {
        return `
            <div class="test-case">
                <div class="test-case-header">
                    <div>
                        <span class="test-id">${testCase.id}</span>
                        <span class="test-category">${testCase.category}</span>
                    </div>
                    <span class="priority ${testCase.priority}">${testCase.priority.toUpperCase()}</span>
                </div>
                <div class="test-content">
                    ${generateTestFields(testCase)}
                    ${testCase.tags ? `
                        <div class="tags">
                            ${testCase.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function generateTestFields(testCase) {
    const excludeFields = ['id', 'category', 'priority', 'tags'];
    return Object.keys(testCase)
        .filter(key => !excludeFields.includes(key))
        .map(key => {
            const value = testCase[key];
            const displayValue = typeof value === 'object' ? 
                JSON.stringify(value, null, 2) : 
                value.toString();
            
            return `
                <div class="test-field">
                    <div class="field-label">${key.replace(/_/g, ' ').toUpperCase()}:</div>
                    <div class="field-value">${displayValue}</div>
                </div>
            `;
        }).join('');
}

// Generate và save file HTML
const html = generateHTML();
fs.writeFileSync('./chatsmith_dataset.html', html);
console.log('✅ HTML file generated successfully: chatsmith_dataset.html');