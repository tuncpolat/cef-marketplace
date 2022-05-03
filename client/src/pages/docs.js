import { useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../components/shared/CodeBlock";

const subNavigation = [
  { name: "Factory", href: "#factory", current: false },
  { name: "ERC20", href: "#erc20", current: false },
  { name: "Waiting List", href: "#waitinglist", current: false },
  { name: "Dutch Auction", href: "#dutchauction", current: false },
  { name: "Corporate Actions", href: "#corporateactions", current: false },
  { name: "Helper Functions", href: "#helper", current: false },
  { name: "Credits", href: "#credits", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Docs() {
  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowCommenting, setAllowCommenting] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14">
      <main className="relative">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>

              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-4 sm:p-6 lg:pb-8" id="factory">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                      Factory
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime mollitia, molestiae quas vel sint commodi
                      repudiandae consequuntur voluptatum laborum numquam
                      blanditiis harum quisquam eius sed odit fugiat iusto fuga
                      praesentium optio, eaque rerum! Provident similique
                      accusantium nemo autem. Veritatis obcaecati tenetur iure
                      eius earum ut molestias architecto voluptate aliquam
                      nihil, eveniet aliquid culpa officia aut! Impedit sit sunt
                      quaerat, odit, tenetur error, harum nesciunt ipsum debitis
                      quas aliquid. Reprehenderit, quia. Quo neque error
                      repudiandae fuga? Ipsa laudantium molestias eos sapiente
                      officiis modi at sunt exceptur
                    </p>
                    <ReactMarkdown className="mt-6" components={CodeBlock}>
                      {`contract CEFFactory {
      
      ClosedEndFund[] public deployedCEF;

      function createCEF(
          string memory _title,
          string memory _description,
          uint256 _tokenPrice,
          uint256 _initialSupply,
          uint256 _tokensPerInvestor,
          bool _isDutchAuction,
          uint256 _timeToBuyInHours,
          address[] memory _whiteListedInvestors
      ) public {
          ClosedEndFund newCEF = new ClosedEndFund(
              msg.sender,
              _title,
              _description,
              _tokenPrice,
              _initialSupply,
              _tokensPerInvestor,
              _isDutchAuction,
              _timeToBuyInHours,
              _whiteListedInvestors
          );
          deployedCEF.push(newCEF);
      }

      function getDeployedCEF() public view returns (ClosedEndFund[] memory) {
          return deployedCEF;
      }
}`}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-6" id="erc20">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        ERC20
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt exceptur
                      </p>
                    </div>
                  </div>

                  <div className="mt-6" id="waitinglist">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Waiting List
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt exceptur
                      </p>
                    </div>
                  </div>

                  <div className="mt-6" id="dutchauction">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Dutch Auction
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt exceptur
                      </p>
                    </div>
                  </div>

                  <div className="mt-6" id="corporateactions">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Corporate Actions
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt exceptur
                      </p>
                    </div>
                  </div>

                  <div className="mt-6" id="helper">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Helper Functions
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt exceptur
                      </p>
                    </div>
                  </div>

                  <div className="mt-6" id="credits">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Helper Functions
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt exceptur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
