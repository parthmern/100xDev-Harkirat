const { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingInstancesCommand } = require("@aws-sdk/client-auto-scaling");
const { EC2Client, ListImagesInRecycleBinCommand, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const client = new AutoScalingClient({
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
});

const ec2Client = new EC2Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
});

const ALL_MACHINES = [];    // [ {ip:"xx", isUsed:true, } ]

async function refreshInstances(){
    const command = new DescribeAutoScalingInstancesCommand({
        AutoScalingGroupName : "vscode-autoscaling-grp",
    })
    const data = await client.send(command);
    console.log("DescribeAutoScalingInstancesCommand =>", data);
    ALL_MACHINES.push(data.AutoScalingInstances);

    const ec2InstanceCommand = new DescribeInstancesCommand({
        InstanceIds : data.AutoScalingInstances?.map((x)=> x.InstanceId)
    })
    const ec2Res = await ec2Client.send(ec2InstanceCommand);
    console.log(ec2Res.Reservations[0].Instances[0].PublicDnsName);

    // TODO : enrich the all machines and store them in ALL_MACHINES
}
refreshInstances();

setInterval(async()=>{
    refreshInstances();
}, 10*1000);

app.get("/:projectId", async (req, res)=>{
    const {projectId} = useParams();
    
    const idleMachine = ALL_MACHINES.find((x)=> x.isUsed == false )
    if(!idleMachine){
        // todo : scaleup infra here
        res.status(400).send("no idle machine found");
    }

    idleMachine.isUsed = true;

    // scale up infra
    const command = new SetDesiredCapacityCommand({
        AutoScalingGroupName: "vscode-autoscaling-grp",
        DesiredCapacity: ALL_MACHINES.length + (5 - ALL_MACHINES.filter((x)=> x.isUsed==false).length)
    })

    client.send(command);

    res.send({
        ip : idleMachine.ip
    })
})

app.post("/destroy", (req,res)=>{
    // scale down machine if user is not connected 
    // can hit it after 10minutes 
})

app.listen(3000, () => {
    console.log("listen on 3000");
})



async function main() {

    const command = new SetDesiredCapacityCommand({
        AutoScalingGroupName: "vscode-autoscaling-grp",
        DesiredCapacity: 3,
    });

    const data = await client.send(command);
    console.log("Scaling updated successfully:", data);     // updated automatically to DesiredCapacity= 3

}

main();
