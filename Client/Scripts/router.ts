

namespace core {
    export class Router {

        private m_activeLink:string;
        private m_linkData:string;
        private m_routingTable: string[];
        //private m_

        constructor() {
            this.m_activeLink = "";
        }

        get ActiveLink():string {
            return this.m_activeLink;
        }

        set ActiveLink(link:string) {
            this.m_activeLink = link;
        }

        get LinkData():string{
            return this.m_linkData;
        }

        set LinkData(data:string){
            this.m_linkData = data;
        }

        /**
         * adds a new route to the table
         *
         * @param {*} route
         * @memberof Router
         */
        public Add(route:string):void {
            this.m_routingTable.push(route);
        }

        /**
         * replace current table with a new table
         *
         * @param {*} routingTable
         * 
         * @memberof Router
         */
        public AddTable(routingTable:string[]):void {
            this.m_routingTable = routingTable;
        }

        /**
         *find the index of the route in the routing table
         *returns -1 if no index found
         *
         * @param {*} route
         * @return {int} route
         * @memberof Router
         */
        public Find(route:string):number {
            return this.m_routingTable.indexOf(route);
        }

        /**
         *remove an index of a routing table if it is found
         *returns true if the index was removed, false if no index was found
         *
         * @param {*} route
         * @return {boolean} 
         * @memberof Router
         */
        public Remove(route:string):boolean {
            if (this.Find(route) > -1) {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        public ToString():string{
            return this.m_routingTable.toString()
        }
    }
}

//move code into own file
let router = new core.Router();
router.AddTable([
                    "/",
                    "/home",
                    "/about",
                    "/services",
                    "/contact",
                    "/contact-list",
                    "/projects",
                    "/register",
                    "/login",
                    "/edit",
                ]);

let route = location.pathname;
if (router.Find(route) > -1){
    router.ActiveLink = (route == "/") ? "home" : route.substring(1);
}
else
{
    router.ActiveLink = "404";
}