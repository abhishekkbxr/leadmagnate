import React from 'react'
import { FiArrowRight, FiCheck, FiFileText, FiX } from 'react-icons/fi'

const SupportDetails = () => {
    return (
        <div className="offcanvas offcanvas-end topics-details-offcanvas" tabIndex={-1} id="topicsDetailsOffcanvas" aria-labelledby="topicsDetailsOffcanvas">
            <div className="offcanvas-header border-bottom px-4">
                <div className="d-flex">
                    <a href="#">Help</a>
                    <span className="mx-2 text-muted">/</span>
                    <a href="#">Started</a>
                    <span className="mx-2 text-muted">/</span>
                    <div className="text-muted">Integration</div>
                </div>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
                <div className="p-lg-5 mx-lg-5 help-center details-content-body">
                    <h2 className="fs-18">How to filter object on the map?</h2>
                    <p className="fs-12 text-muted">Last Updates: <span className="text-dark fw-medium">26 May, 2024</span></p>
                    <hr className="my-4" />
                    <h4 className="fs-14">Hey there...!!!</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda consectetur illo at placeat cum nulla repellat expedita nostrum praesentium blanditiis repudiandae commodi tempore debitis odio, doloremque magni eaque soluta cupiditate ullam harum, necessitatibus sunt voluptas eum laboriosam. Consequatur nobis fuga fugiat deleniti veritatis sint, suscipit magni tempora labore. Neque, eaque?</p>
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda consectetur illo at placeat cum nulla repellat expedita nostrum praesentium blanditiis repudiandae commodi tempore debitis odio, doloremque magni eaque soluta cupiditate ullam harum, necessitatibus sunt voluptas eum laboriosam. Consequatur nobis fuga fugiat deleniti veritatis sint, suscipit magni tempora labore. Neque, eaque?</p>
                    <ul className="text-muted my-4">
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Applications</li>
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Video Tutorials</li>
                        <li className="mb-2"><strong className="text-dark">Step by Step</strong> Intigrations Guide</li>
                        <li className="mb-2"><strong className="text-dark">Add favorite</strong> for quick and messaging</li>
                        <li className="mb-2"><strong className="text-dark">Fine-tune</strong> your notifications to focus on that matters</li>
                        <li><strong className="text-dark">Trigger your inbox</strong> and own your email experience</li>
                    </ul>
                    <div className="mt-5">
                        <h2 className="fs-13 fw-700 mb-3">Integration Features</h2>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Access basic company informations and details.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Access and edite bugs reports and create new issues.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Change issues status and assignee of issues.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Open and resolve intercom conversations.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>Add or remover users and change user roles.</span>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>We care about your Privacy in our <a href="#">Privacy &amp; Policy</a>.</span>
                            </li>
                            <li className="d-flex align-items-center">
                                <span className="avatar-text avatar-sm bg-soft-success text-success me-2">
                                    <FiCheck size={10} />
                                </span>
                                <span>By clicking allow access, your authorize untitled to access your informations.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <pre><code className="language-html">{`
<!DOCTYPE html>
<html lang=&quot;zxx&quot;>
<head>
    <meta charset=&quot;utf-8&quot;>
    <meta http-equiv=&quot;x-ua-compatible&quot; content=&quot;IE=edge&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
    <meta name=&quot;description&quot; content=&quot;&quot;>
    <meta name=&quot;keyword&quot; content=&quot;&quot;>
    <meta name=&quot;author&quot; content=&quot;WRAPCODERS&quot;>
    {/* <!--! The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags !--> */}
    {/* <!--! BEGIN: Apps Title--> */}
    <title>Help Center</title>
    {/* <!--! END:  Apps Title--> */}
    {/* <!--! BEGIN: Favicon--> */}
    <link type=&quot;image/x-icon&quot; rel=&quot;shortcut icon&quot; href=&quot;.assets/images/favicon.ico&quot;>
    {/* <!--! END: Favicon--> */}
    {/* <!--! BEGIN: Bootstrap CSS--> */}
    <link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;.assets/css/bootstrap.min.css&quot;>
    {/* <!--! END: Bootstrap CSS--> */}
    {/* <!--! BEGIN: Vendors CSS--> */}
    <link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;.assets/vendors/css/vendors.min.css&quot;>
    {/* <!--! END: Vendors CSS--> */}
    {/* <!--! BEGIN: Custom CSS--> */}
    <link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;.assets/css/theme.min.css&quot;>
    {/* <!--! END: Custom CSS--> */}
    {/* <!--! HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries !--> */}
    {/* <!--! WARNING: Respond.js doesn&apos;t work if you view the page via file: !--> */}
    {/* <!--[if lt IE 9]>
        <script src=&quot;https:oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js&quot;></script>
        <script src=&quot;https:oss.maxcdn.com/respond/1.4.2/respond.min.js&quot;></script>
    <![endif]--> */}
</head>
</html>
                        `}</code></pre>
                    </div>
                    <h4 className="fs-13">👋 Threds</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <h4 className="fs-13">📌 Inbox</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <h4 className="fs-13">👙 Bundles</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <h4 className="fs-13">⌚ Snoozen</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <h4 className="fs-13">🎂 Groups</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <h4 className="fs-13">😳 Channel</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div className="mb-5">
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <h4 className="fs-13">🎉 Favorite</h4>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis minus omnis veniam cupiditate molestiae itaque hic quibusdam fuga modi quam cumque recusandae harum nulla vero, tempore possimus aliquid animi!</p>
                    <div>
                        <pre><code className="language-js">{`
                                const Prism = require('prismjs');
                                // The code snippet you want to highlight, as a string
                                const code = 'var data = 1;';
                                // Returns a highlighted HTML string
                                const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                            `}</code></pre>
                    </div>
                    <hr className="my-5" />
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda consectetur illo at placeat cum nulla repellat expedita nostrum praesentium blanditiis repudiandae commodi tempore debitis odio, doloremque magni eaque soluta cupiditate ullam harum, necessitatibus sunt voluptas eum laboriosam. Consequatur nobis fuga fugiat deleniti veritatis sint, suscipit magni tempora labore. Neque, eaque?</p>
                    <ul className="text-muted my-4">
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Applications</li>
                        <li className="mb-2"><strong className="text-dark">Integration</strong> Video Tutorials</li>
                        <li className="mb-2"><strong className="text-dark">Step by Step</strong> Intigrations Guide</li>
                        <li className="mb-2"><strong className="text-dark">Add favorite</strong> for quick and messaging</li>
                        <li className="mb-2"><strong className="text-dark">Fine-tune</strong> your notifications to focus on that matters</li>
                        <li><strong className="text-dark">Trigger your inbox</strong> and own your email experience</li>
                    </ul>
                    <hr className="my-5" />
                    <div className="w-100 p-5 bg-gray-100 text-center">
                        <h2 className="fs-16 mb-2">Having trouble logging in?</h2>
                        <p className="text-muted">Explore some common issues or solutions or get in tuch with us.</p>
                        <div className="d-flex justify-content-center gap-2">
                            <a href="#" className="btn btn-sm btn-success">Read FAQ&apos;s</a>
                            <a href="#" className="btn btn-sm btn-danger">Contact Support</a>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="d-flex align-items-center text-muted">
                            <fs-11 className="me-3">Is this article helpful?</fs-11>
                            <a href="#" className="wd-15 ht-15 d-flex align-items-center justify-content-center rounded-3 bg-gray-100 m-1">
                                <FiX className="text-danger fs-12" />
                            </a>
                            <a href="#" className="wd-15 ht-15 d-flex align-items-center justify-content-center rounded-3 bg-gray-100 m-1">
                                <FiCheck className="text-success fs-12" />
                            </a>
                        </div>
                    </div>
                    <hr className="my-5" />
                    <div className="mb-4">
                        <h2 className="fs-18 mb-1">Topics in this collections</h2>
                        <p className="fs-12 text-muted">6 More topics in this collections</p>
                    </div>
                    <div className="row">
                        <div className="col-xxl-6">
                            <TrandingCard title={"How to upload data to the system?"} />
                            <TrandingCard title={"How to draw a land plot on a map?"} />
                            <TrandingCard title={"How to to view expire services?"} />
                        </div>
                        <div className="col-xxl-6">
                            <TrandingCard title={"How to upload data to the system?"} />
                            <TrandingCard title={"How to draw a land plot on a map?"} />
                            <TrandingCard title={"How to to view expire services?"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SupportDetails

export const TrandingCard = ({ title}) => {
    return (
        <div className="card border rounded-3 mb-3 overflow-hidden">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="wd-50 ht-50 bg-gray-100 me-3 d-flex align-items-center justify-content-center">
                        <FiFileText size={16} />
                    </div>
                    <a href="#" className="text-truncate-1-line" data-bs-toggle="offcanvas" data-bs-target="#topicsDetailsOffcanvas">{title}</a>
                </div>
                <a href="#" className="avatar-text avatar-sm me-3" data-bs-toggle="offcanvas" data-bs-target="#topicsDetailsOffcanvas">
                    <FiArrowRight />
                </a>
            </div>
        </div>
    );
}