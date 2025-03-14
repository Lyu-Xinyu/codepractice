import React, { useState } from 'react';

const FullyConnectedLayerVisualization = () => {
  const [step, setStep] = useState(0);
  
  // 简化的数据和权重示例
  const inputData = [0.2, 0.5, 0.1, 0.8];
  const weights = [
    [0.1, 0.2, -0.1],
    [-0.1, 0.1, 0.3],
    [0.2, 0.0, 0.5],
    [0.3, -0.2, 0.1]
  ];
  const biases = [0.1, -0.2, 0.1];
  
  // 计算结果
  const outputBeforeBias = Array(biases.length).fill(0).map((_, colIdx) => 
    weights.reduce((sum, row, rowIdx) => sum + inputData[rowIdx] * row[colIdx], 0)
  );
  
  const outputAfterBias = outputBeforeBias.map((val, idx) => val + biases[idx]);
  
  const outputAfterReLU = outputAfterBias.map(val => Math.max(0, val));
  
  const steps = [
    {
      title: "全连接层的计算过程",
      description: "全连接层执行以下基本运算：Y = W·X + b，其中X是输入向量，W是权重矩阵，b是偏置向量。"
    },
    {
      title: "步骤1：矩阵乘法",
      description: "每个输出元素是所有输入元素与对应权重的加权和。"
    },
    {
      title: "步骤2：添加偏置",
      description: "对每个加权和，添加对应的偏置值。"
    },
    {
      title: "步骤3：应用ReLU激活函数",
      description: "ReLU函数将负值设为0，正值保持不变：f(x) = max(0, x)。"
    }
  ];
  
  // 矩阵乘法计算步骤可视化
  const renderMatrixMultiplication = () => {
    return (
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">矩阵乘法详细步骤</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {outputBeforeBias.map((output, outputIdx) => (
            <div key={outputIdx} className="border border-blue-200 rounded p-3 bg-white">
              <div className="text-sm font-medium mb-2">输出节点 {outputIdx + 1} 的计算:</div>
              <div className="flex flex-wrap items-center">
                <span className="mr-2">结果 =</span>
                {inputData.map((input, inputIdx) => (
                  <div key={inputIdx} className="flex items-center mr-2">
                    {inputIdx > 0 && <span className="mx-1">+</span>}
                    <span className="bg-blue-100 px-2 py-1 rounded">{input.toFixed(1)}</span>
                    <span className="mx-1">×</span>
                    <span className="bg-green-100 px-2 py-1 rounded">{weights[inputIdx][outputIdx].toFixed(1)}</span>
                  </div>
                ))}
                <span className="mx-2">=</span>
                <span className="font-bold">{output.toFixed(3)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // 权重可视化
  const renderWeights = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">权重矩阵 W [{inputData.length} × {biases.length}]</h3>
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-100"></th>
                {biases.map((_, idx) => (
                  <th key={idx} className="border border-gray-300 p-2 bg-gray-100">
                    输出 {idx + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weights.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="border border-gray-300 p-2 bg-gray-100">
                    输入 {rowIdx + 1}
                  </td>
                  {row.map((weight, colIdx) => (
                    <td key={colIdx} className="border border-gray-300 p-2 text-center bg-green-50">
                      {weight.toFixed(1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // 偏置可视化
  const renderBiases = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">偏置向量 b [{biases.length}]</h3>
        <div className="flex">
          {biases.map((bias, idx) => (
            <div key={idx} className="border border-gray-300 p-2 mr-2 min-w-16 text-center bg-yellow-50">
              {bias.toFixed(1)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // 输入数据可视化
  const renderInput = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">输入向量 X [{inputData.length}]</h3>
        <div className="flex">
          {inputData.map((input, idx) => (
            <div key={idx} className="border border-gray-300 p-2 mr-2 min-w-16 text-center bg-blue-50">
              {input.toFixed(1)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // 计算过程和结果可视化
  const renderCalculation = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">计算过程</h3>
        
        <div className="flex flex-col space-y-4">
          {/* 矩阵乘法结果 */}
          {step >= 1 && (
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="font-medium mb-2">步骤1: W·X (矩阵乘法结果)</div>
              <div className="flex">
                {outputBeforeBias.map((output, idx) => (
                  <div key={idx} className="border border-gray-300 p-2 mr-2 min-w-16 text-center bg-blue-100">
                    {output?.toFixed(3) || "0.000"}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 添加偏置后的结果 */}
          {step >= 2 && (
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <div className="font-medium mb-2">步骤2: W·X + b (添加偏置)</div>
              <div className="flex items-center">
                <div className="flex mb-2">
                  {outputBeforeBias.map((output, idx) => (
                    <div key={idx} className="flex items-center mr-2">
                      <div className="bg-blue-100 px-2 py-1 rounded">
                        {output?.toFixed(3) || "0.000"}
                      </div>
                      <span className="mx-1">+</span>
                      <div className="bg-yellow-100 px-2 py-1 rounded">
                        {biases[idx]?.toFixed(1) || "0.0"}
                      </div>
                      <span className="mx-1">=</span>
                      <div className="font-bold">
                        {outputAfterBias[idx]?.toFixed(3) || "0.000"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                {outputAfterBias.map((output, idx) => (
                  <div key={idx} className="border border-gray-300 p-2 mr-2 min-w-16 text-center bg-purple-100">
                    {output?.toFixed(3) || "0.000"}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* ReLU激活后的结果 */}
          {step >= 3 && (
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="font-medium mb-2">步骤3: ReLU(W·X + b) (激活函数)</div>
              <div className="flex items-center">
                <div className="flex mb-2">
                  {outputAfterBias.map((output, idx) => (
                    <div key={idx} className="flex items-center mr-4">
                      <span>ReLU(</span>
                      <div className="bg-purple-100 px-2 py-1 rounded mx-1">
                        {output?.toFixed(3) || "0.000"}
                      </div>
                      <span>) =</span>
                      <div className="font-bold ml-1">
                        {outputAfterReLU[idx]?.toFixed(3) || "0.000"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                {outputAfterReLU.map((output, idx) => (
                  <div key={idx} className="border border-gray-300 p-2 mr-2 min-w-16 text-center bg-green-100">
                    {output?.toFixed(3) || "0.000"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // 全尺寸网络示意
  const renderNetworkVisualization = () => {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">全连接网络图示</h3>
        <div className="flex justify-center items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center mr-4">
            <div className="text-sm font-medium mb-2">输入层</div>
            <div className="flex flex-col space-y-3">
              {inputData.map((_, idx) => (
                <div key={idx} className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-400">
                  X<sub>{idx+1}</sub>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mx-6">
            <div className="text-center mb-2 font-medium">权重</div>
            <svg width="80" height="120" viewBox="0 0 80 120">
              <path d="M0,0 L80,120" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M0,40 L80,0" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M0,40 L80,60" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M0,80 L80,0" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M0,80 L80,60" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M0,120 L80,60" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M0,120 L80,120" stroke="#888" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>
          
          <div className="flex flex-col items-center ml-4">
            <div className="text-sm font-medium mb-2">输出层</div>
            <div className="flex flex-col space-y-3">
              {biases.map((_, idx) => (
                <div key={idx} className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-400">
                  Y<sub>{idx+1}</sub>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{steps[step].title}</h2>
      
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">{steps[step].description}</p>
      </div>
      
      {renderNetworkVisualization()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          {renderInput()}
          {renderWeights()}
          {renderBiases()}
        </div>
        <div>
          {renderCalculation()}
        </div>
      </div>
      
      {step === 1 && renderMatrixMultiplication()}
      
      <div className="flex justify-center space-x-4 mt-8">
        {steps.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setStep(idx)}
            className={`px-4 py-2 rounded ${step === idx 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {idx === 0 ? "概述" : `步骤 ${idx}`}
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2 text-gray-300">PyTorch 代码</h3>
        <pre className="text-sm">
{`# 全连接层在 PyTorch 中的定义
nn.Linear(in_features, out_features, bias=True)

# 前向传播计算
def forward(self, x):
    return F.linear(x, self.weight, self.bias)`}
        </pre>
        
        <h3 className="text-lg font-semibold my-2 text-gray-300">NumPy 代码实现</h3>
        <pre className="text-sm">
{`# 全连接层的实现
def linear_layer(input_data, weights, biases):
    # 矩阵乘法: Y = X @ W
    output = np.dot(input_data, weights)
    
    # 添加偏置: Y = X @ W + b
    output += biases
    
    return output

# ReLU 激活函数
def relu(x):
    return np.maximum(0, x)`}
        </pre>
      </div>
    </div>
  );
};

export default FullyConnectedLayerVisualization;
